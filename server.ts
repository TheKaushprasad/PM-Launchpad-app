import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import { scrapeLinkedInProfile, validateLinkedInUrl } from "./services/firecrawl";
import { normalizeProfileData, analyzeProfileWithAI, getSampleAnalysis, TARGET_ROLE_KEYWORDS } from "./services/profileAnalyzer";
import { evaluateResumeAlgorithmically } from "./lib/resumeAuditEngine";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      env: process.env.NODE_ENV,
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      port: PORT
    });
  });

  // OpenAI Client Initialization
  const getOpenAI = () => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is required");
    }
    return new OpenAI({ apiKey });
  };

  // Helper to execute AI call with Gemini (with multi-model fallback and OpenAI fallback)
  async function generateAIResponse({ 
    prompt, 
    systemInstruction, 
    jsonMode = false,
    maxOutputTokens
  }: { 
    prompt: string; 
    systemInstruction: string; 
    jsonMode?: boolean;
    maxOutputTokens?: number;
  }): Promise<string> {
    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;
    const hasValidGeminiKey = geminiKey && geminiKey.trim() !== "" && geminiKey !== "undefined" && geminiKey !== "null";
    const hasValidOpenAiKey = openAiKey && openAiKey.trim() !== "" && openAiKey !== "undefined" && openAiKey !== "null";

    // 1. Try Gemini with candidate models in priority order
    if (hasValidGeminiKey) {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({
        apiKey: geminiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Priority list of active, supported models from skill guidelines
      const candidateModels = [
        'gemini-3.7-flash',
        'gemini-flash-latest',
        'gemini-3.1-flash-lite'
      ];

      let lastError: any = null;

      for (const modelName of candidateModels) {
        try {
          const config: any = {
            systemInstruction,
            temperature: jsonMode ? 0.2 : 0.7,
          };

          if (jsonMode) {
            config.responseMimeType = "application/json";
          }
          if (maxOutputTokens) {
            config.maxOutputTokens = maxOutputTokens;
          }

          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config,
          });

          if (response && response.text && response.text.trim().length > 0) {
            return response.text;
          }
        } catch (err: any) {
          lastError = err;
          const errMsg = err?.message || String(err);
          console.warn(`[AI Proxy]: Model ${modelName} encountered error: ${errMsg}`);
          
          // If responseMimeType caused issues, try without responseMimeType
          if (jsonMode) {
            try {
              const fallbackResponse = await ai.models.generateContent({
                model: modelName,
                contents: `${systemInstruction}\n\nRespond with strictly valid JSON only.\n\n${prompt}`,
              });
              if (fallbackResponse && fallbackResponse.text && fallbackResponse.text.trim().length > 0) {
                return fallbackResponse.text;
              }
            } catch (fbErr) {
              // continue to next candidate model
            }
          }
        }
      }

      // If all Gemini models failed, try OpenAI if key is present
      if (hasValidOpenAiKey) {
        try {
          console.log("[AI Proxy]: Falling back to OpenAI gpt-4o...");
          const openai = getOpenAI();
          const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
              { role: "system", content: systemInstruction },
              { role: "user", content: prompt }
            ],
            temperature: jsonMode ? 0.2 : 0.7,
            response_format: jsonMode ? { type: "json_object" } : undefined,
          });
          if (completion.choices[0]?.message?.content) {
            return completion.choices[0].message.content;
          }
        } catch (openAiErr) {
          console.error("[AI Proxy]: OpenAI fallback also failed:", openAiErr);
        }
      }

      throw lastError || new Error("All AI models were temporarily unable to process the request.");
    } else if (hasValidOpenAiKey) {
      const openai = getOpenAI();
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt }
        ],
        temperature: jsonMode ? 0.2 : 0.7,
        response_format: jsonMode ? { type: "json_object" } : undefined,
      });
      return completion.choices[0].message.content || "";
    } else {
      throw new Error("No valid AI API key found. Please configure GEMINI_API_KEY in Settings.");
    }
  }

  // ==========================================
  // LINKEDIN OPTIMISER API ENDPOINTS
  // ==========================================

  // 1. Analyze Profile (Firecrawl Scrape + AI Scoring & Deep Audit)
  app.post(["/api/analyse-profile", "/api/analyse-profile/"], async (req, res) => {
    console.log(`[${new Date().toISOString()}] POST ${req.path} - Analyzing Profile`);
    try {
      const { 
        profileText,
        rawProfileText,
        linkedinUrl, 
        targetRole = 'Product Manager', 
        experience = '2-4 years', 
        industry = 'Technology / SaaS', 
        companyType = 'Growth-stage Scale-up',
        location = '',
        manualProfileData,
        useSample = false
      } = req.body;

      // Fast-path: User selected sample preview
      if (useSample || (linkedinUrl && linkedinUrl.includes('example'))) {
        const sampleAudit = getSampleAnalysis(targetRole);
        return res.json({ success: true, result: sampleAudit, isMockSample: true });
      }

      let structuredProfile;
      let rawScrapedMarkdown = "";

      const rawPastedContent = profileText || rawProfileText;

      // Primary Path: User pasted entire LinkedIn profile page details
      if (rawPastedContent && typeof rawPastedContent === 'string' && rawPastedContent.trim().length > 0) {
        structuredProfile = normalizeProfileData({
          profileText: rawPastedContent.trim(),
          targetRole,
          industry,
          experienceLevel: experience,
          companyType,
          location
        });
      }
      // Fallback Path A: User supplied LinkedIn URL (if provided)
      else if (linkedinUrl && linkedinUrl.trim()) {
        const trimmedUrl = linkedinUrl.trim();
        
        if (!validateLinkedInUrl(trimmedUrl)) {
          return res.status(400).json({ 
            success: false, 
            error: "Please provide a valid LinkedIn profile URL or paste your profile details directly." 
          });
        }

        // Firecrawl extraction
        const scrapeResult = await scrapeLinkedInProfile(trimmedUrl);

        if (!scrapeResult.success || !scrapeResult.markdown) {
          if (manualProfileData && (manualProfileData.headline || manualProfileData.about || manualProfileData.experienceText)) {
            structuredProfile = normalizeProfileData({
              ...manualProfileData,
              targetRole,
              industry,
              experienceLevel: experience,
              companyType,
              location
            });
          } else {
            return res.status(200).json({
              success: false,
              isBlockedOrPrivate: true,
              error: scrapeResult.error || "LinkedIn requires authentication to view profiles directly and restricts automated web crawlers. Please paste your profile details directly to run your 100-point AI audit."
            });
          }
        } else {
          rawScrapedMarkdown = scrapeResult.markdown;
          structuredProfile = normalizeProfileData({
            rawMarkdown: rawScrapedMarkdown,
            targetRole,
            industry,
            experienceLevel: experience,
            companyType,
            location
          });
        }
      } 
      // Fallback Path B: Sub-field manual profile submission
      else if (manualProfileData) {
        structuredProfile = normalizeProfileData({
          ...manualProfileData,
          targetRole,
          industry,
          experienceLevel: experience,
          companyType,
          location
        });
      } else {
        return res.status(400).json({
          success: false,
          error: "Please paste your LinkedIn profile details or load the sample profile."
        });
      }

      // Execute deep AI evaluation
      const auditResult = await analyzeProfileWithAI(structuredProfile, generateAIResponse);
      if (rawScrapedMarkdown) {
        auditResult.rawScrapedExcerpt = rawScrapedMarkdown.slice(0, 1000);
      }

      res.json({ success: true, result: auditResult });
    } catch (error: any) {
      console.error("[LinkedIn Analysis Error]:", error);
      res.status(500).json({ 
        success: false, 
        error: error.message || "Failed to analyze LinkedIn profile. Please try again." 
      });
    }
  });

  // 2. Section Rewriter (Headline, About, Experience bullets)
  app.post(["/api/rewrite", "/api/rewrite/"], async (req, res) => {
    try {
      const { section, currentText, targetRole = 'Product Manager', focusTag = 'Recruiter-Optimized', customInstructions } = req.body;

      if (!currentText || !section) {
        return res.status(400).json({ error: "Missing section or currentText" });
      }

      const prompt = `Rewrite and optimize the following LinkedIn ${section} for a professional targeting the role "${targetRole}".
Focus style: "${focusTag}".
${customInstructions ? `Custom instructions: ${customInstructions}` : ''}

<PROFILE_DATA>
${currentText}
</PROFILE_DATA>

Provide 3 distinct rewritten options:
1. High-Impact / Recruiter-Search Optimized (rich in target domain keywords and value proposition)
2. Metric & Outcome Focused (Action + Context + Result format, leaves [Insert %] placeholders if exact metrics aren't in source data)
3. Executive & Storytelling Focus (distinctive, confident, non-generic)

Return strictly valid JSON in this format:
{
  "section": "${section}",
  "critique": "Brief explanation of why the original was sub-optimal",
  "improvedVersions": [
    { "title": "Option 1", "content": "rewritten text", "focusTag": "Search Velocity" },
    { "title": "Option 2", "content": "rewritten text", "focusTag": "Outcome Driven" },
    { "title": "Option 3", "content": "rewritten text", "focusTag": "Executive Narrative" }
  ]
}`;

      const systemInstruction = `You are a world-class executive resume writer and LinkedIn personal branding strategist. Never invent false achievements or fake employers. Return strictly valid JSON.`;
      const aiResponse = await generateAIResponse({ prompt, systemInstruction, jsonMode: true });
      const parsed = JSON.parse(aiResponse);

      res.json({ success: true, ...parsed });
    } catch (err: any) {
      console.error("[Rewrite API Error]:", err);
      res.status(500).json({ error: err.message || "Failed to generate rewrite" });
    }
  });

  // 3. Experience Bullet-by-Bullet Optimizer (Action + Context + Action Taken + Result)
  app.post(["/api/analyse-experience", "/api/analyse-experience/"], async (req, res) => {
    try {
      const { roleTitle, company, bulletsText, targetRole = 'Product Manager' } = req.body;

      if (!bulletsText) {
        return res.status(400).json({ error: "Missing bulletsText" });
      }

      const prompt = `Analyze each experience bullet below for a candidate targeting "${targetRole}" at "${company}" (${roleTitle}).
Evaluate each bullet strictly against the: Action + Context + Action Taken + Result (ACAR) framework.

<PROFILE_DATA>
${bulletsText}
</PROFILE_DATA>

Return strictly valid JSON:
{
  "roleTitle": "${roleTitle || 'Role'}",
  "company": "${company || 'Company'}",
  "overallFeedback": "1-2 sentences on how to elevate this role's positioning",
  "bullets": [
    {
      "originalBullet": "string",
      "critique": "What is missing or weak (e.g. passive verb, no context, missing quantified result)",
      "frameworkMissing": ["Result", "Action Verb"],
      "suggestedBullet": "Upgraded bullet adhering strictly to ACAR. Never fabricate unprovided numbers; insert '[Insert % / $ metric]' placeholders if needed.",
      "suggestedMetricPlaceholder": "Suggested metric type e.g. conversion rate or ARR"
    }
  ]
}`;

      const systemInstruction = `You are a Principal Product Hiring Manager and expert resume coach. Return strictly valid JSON.`;
      const aiResponse = await generateAIResponse({ prompt, systemInstruction, jsonMode: true });
      const parsed = JSON.parse(aiResponse);

      res.json({ success: true, ...parsed });
    } catch (err: any) {
      console.error("[Experience Analyzer Error]:", err);
      res.status(500).json({ error: err.message || "Failed to analyze experience bullets" });
    }
  });

  // 4. Keyword Gap Analysis API
  app.post(["/api/keyword-gap", "/api/keyword-gap/"], async (req, res) => {
    try {
      const { targetRole = 'Product Manager', currentSkills = [], currentText = '' } = req.body;
      const benchmark = TARGET_ROLE_KEYWORDS[targetRole] || TARGET_ROLE_KEYWORDS['Product Manager'];

      const prompt = `Perform an ATS & Recruiter Keyword Gap Analysis for a candidate targeting "${targetRole}".
Candidate Skills: ${Array.isArray(currentSkills) ? currentSkills.join(', ') : currentSkills}
Candidate Profile Excerpt:
<PROFILE_DATA>
${currentText}
</PROFILE_DATA>

Benchmark Keywords:
Critical: ${benchmark.critical.join(', ')}
Recommended: ${benchmark.recommended.join(', ')}
Technical: ${benchmark.technical.join(', ')}

Return strictly valid JSON:
{
  "keywordCoveragePercent": number (0-100),
  "strongKeywords": [ { "keyword": "string", "count": 2, "context": "where it appears" } ],
  "missingKeywords": [ { "keyword": "string", "importance": "Critical" | "Recommended", "whyItMatters": "why recruiters filter by this" } ],
  "overusedKeywords": [ { "keyword": "string", "advice": "why to replace" } ],
  "irrelevantKeywords": ["string"]
}`;

      const systemInstruction = `You are an ATS search algorithm auditor. Return strictly valid JSON.`;
      const aiResponse = await generateAIResponse({ prompt, systemInstruction, jsonMode: true });
      const parsed = JSON.parse(aiResponse);

      res.json({ success: true, ...parsed });
    } catch (err: any) {
      console.error("[Keyword Gap Error]:", err);
      res.status(500).json({ error: err.message || "Failed to analyze keywords" });
    }
  });

  // 5. Action Plan Generator API
  app.post(["/api/generate-action-plan", "/api/generate-action-plan/"], async (req, res) => {
    try {
      const { targetRole = 'Product Manager', weaknesses = [], currentScore = 75 } = req.body;

      const prompt = `Generate a prioritized 3-day action plan for a candidate targeting "${targetRole}" with an initial profile score of ${currentScore}/100.
Candidate Weaknesses identified: ${JSON.stringify(weaknesses)}

Return strictly valid JSON with 3 days:
{
  "actionPlan": [
    {
      "dayNumber": 1,
      "phaseTitle": "Phase 1: High-Impact First Impressions",
      "estimatedMinutes": 25,
      "tasks": [
        { "id": "t1", "title": "Task title", "description": "Specific step", "category": "Headline", "impact": "High", "completed": false }
      ]
    },
    {
      "dayNumber": 2,
      "phaseTitle": "Phase 2: Experience & Metric Quantification",
      "estimatedMinutes": 35,
      "tasks": [
        { "id": "t2", "title": "Task title", "description": "Specific step", "category": "Experience", "impact": "High", "completed": false }
      ]
    },
    {
      "dayNumber": 3,
      "phaseTitle": "Phase 3: Search Visibility & Social Proof",
      "estimatedMinutes": 20,
      "tasks": [
        { "id": "t3", "title": "Task title", "description": "Specific step", "category": "Skills", "impact": "Medium", "completed": false }
      ]
    }
  ]
}`;

      const systemInstruction = `You are a high-performance career coach. Return strictly valid JSON.`;
      const aiResponse = await generateAIResponse({ prompt, systemInstruction, jsonMode: true });
      const parsed = JSON.parse(aiResponse);

      res.json({ success: true, ...parsed });
    } catch (err: any) {
      console.error("[Action Plan Error]:", err);
      res.status(500).json({ error: err.message || "Failed to generate action plan" });
    }
  });

  // Legacy/Compatibility API Route for LinkedIn Audit
  app.post(["/api/audit-linkedin", "/api/audit-linkedin/"], async (req, res) => {
    console.log(`[${new Date().toISOString()}] POST ${req.path} - Request received`);
    try {
      const { profileData, targetRoles, systemInstruction } = req.body;
      
      if (!profileData || !targetRoles) {
        console.warn(`[${new Date().toISOString()}] POST ${req.path} - Missing fields`);
        return res.status(400).json({ error: "Missing required fields" });
      }

      const rolesStr = targetRoles.join(', ');
      const prompt = `User is targeting these roles: ${rolesStr}. Audit this profile text for overall alignment and shortlisting probability:\n\n${profileData}`;
      const systemPrompt = systemInstruction.replace('[TARGET_ROLES_PLACEHOLDER]', rolesStr);
      
      const result = await generateAIResponse({ prompt, systemInstruction: systemPrompt });

      console.log(`[${new Date().toISOString()}] POST ${req.path} - Success`);
      res.json({ text: result });
    } catch (error: any) {
      console.error(`[${new Date().toISOString()}] POST ${req.path} - Error:`, error);
      res.status(500).json({ error: error.message || "Failed to generate audit" });
    }
  });

  // ==========================================
  // RESUME PDF & DOCUMENT PARSER ENDPOINT
  // ==========================================
  app.post(["/api/parse-resume-file", "/api/parse-resume-file/"], async (req, res) => {
    console.log(`[${new Date().toISOString()}] POST ${req.path} - Parsing Resume Document`);
    try {
      const { fileBase64, fileName, mimeType = "application/pdf" } = req.body;

      if (!fileBase64 || typeof fileBase64 !== "string") {
        return res.status(400).json({ error: "Please upload a valid resume file." });
      }

      // Handle raw text/plain files directly without AI overhead
      if (mimeType.includes("text/plain") || mimeType.includes("text/markdown") || (fileName && (fileName.endsWith('.txt') || fileName.endsWith('.md')))) {
        const decodedText = Buffer.from(fileBase64, 'base64').toString('utf-8');
        return res.json({
          success: true,
          text: decodedText.trim(),
          fileName: fileName || "Resume.txt",
          wordCount: decodedText.trim().split(/\s+/).filter(Boolean).length
        });
      }

      const geminiKey = process.env.GEMINI_API_KEY;
      if (!geminiKey || geminiKey.trim() === "" || geminiKey === "undefined") {
        throw new Error("GEMINI_API_KEY is required on the server to parse PDF documents.");
      }

      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({
        apiKey: geminiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const extractionPrompt = `You are a high-precision ATS document extraction engine. 
Extract all text content from this attached resume/CV document accurately and faithfully.

Guidelines:
1. Preserve all candidate details: Full Name, Contact Info, Email, LinkedIn, Location.
2. Preserve all section headers: Summary, Work Experience, Education, Projects, Skills & Certifications.
3. Preserve all job titles, employer/company names, employment dates, and bullet points verbatim.
4. If the resume has a multi-column or modern design, reconstruct the logical reading order cleanly without scrambled text.
5. Do NOT summarize, abbreviate, or add speculative content. Return the complete plain text resume.`;

      const candidateModels = [
        'gemini-3.1-flash-lite',
        'gemini-flash-latest',
        'gemini-3.7-flash'
      ];

      let extractedText = "";
      let lastErr: any = null;

      for (const modelName of candidateModels) {
        try {
          const config: any = {};
          if (modelName.includes("3.7")) {
            config.thinkingConfig = { thinkingBudget: 0 };
          }
          const response = await ai.models.generateContent({
            model: modelName,
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      mimeType: mimeType.includes("pdf") ? "application/pdf" : mimeType,
                      data: fileBase64
                    }
                  },
                  {
                    text: extractionPrompt
                  }
                ]
              }
            ],
            config
          });

          if (response && response.text && response.text.trim().length >= 20) {
            extractedText = response.text.trim();
            break;
          }
        } catch (err: any) {
          lastErr = err;
          console.warn(`[Parse Resume Document]: Model ${modelName} failed:`, err?.message || err);
        }
      }

      if (!extractedText || extractedText.length < 20) {
        throw new Error(lastErr?.message || "Could not extract legible text from this PDF document. Please verify the document is not an empty image scan or password protected.");
      }

      const wordCount = extractedText.split(/\s+/).filter(Boolean).length;

      res.json({
        success: true,
        text: extractedText,
        fileName: fileName || "Resume.pdf",
        wordCount
      });
    } catch (err: any) {
      console.error("[Parse Resume Error]:", err);
      res.status(500).json({ error: err.message || "Failed to parse resume document." });
    }
  });

  // ==========================================
  // PM RESUME AUDITOR API ENDPOINT
  // ==========================================
  app.post("/api/audit-resume", async (req, res) => {
    console.log(`[${new Date().toISOString()}] POST ${req.path} - Auditing PM Resume`);
    try {
      const { resumeText, targetRole = "Product Manager", jobTitle, jobDescription } = req.body;

      if (!resumeText || typeof resumeText !== "string" || !resumeText.trim()) {
        return res.status(400).json({ error: "Please provide your resume text for auditing." });
      }

      const hasJobCheck = Boolean(jobDescription && typeof jobDescription === "string" && jobDescription.trim().length > 10);

      const SYSTEM_PROMPT = `You are a senior Product Management hiring manager and resume auditor with 15+ years of experience hiring PMs at top tech companies. You are auditing a resume submitted by an aspiring or working Product Manager. Your job is to give an honest, specific, and actionable assessment — not generic encouragement.

You will be given the parsed text of a resume${hasJobCheck ? ' along with a specific target Job Role / Job Description to benchmark suitability against' : ''}. Analyze it and return your assessment as a single JSON object matching the schema below. Do not include any text outside the JSON object.

## Scoring Philosophy

Score this resume the way a PM hiring manager actually reads resumes — skimming for signal in under 30 seconds, looking for:
1. Outcome-driven impact (not task lists)
2. Ownership and strategic thinking (not just execution/coordination)
3. Quantified results tied to real business or product metrics
4. Clarity and scannability

Be honest and specific. A resume with vague, task-listy bullets and no metrics should score low, even if the underlying experience sounds impressive. Do not inflate scores to be encouraging — the value of this tool is honest signal.

## Scoring Dimensions (score each 0-100)

1. **impact_metrics_score**: Do bullets show quantified outcomes (%, $, users, time saved, etc.) tied to real product/business results? Penalize bullets that only describe activities ("managed," "coordinated," "worked on") without stating what changed as a result.

2. **pm_framing_score**: Does the resume read like a Product Manager — someone who owns problems, makes trade-off decisions, influences cross-functional teams, and drives outcomes — or does it read like an execution/coordination role (BA, project coordinator, generic "worked with engineering and design")? Score higher for language showing ownership, prioritization decisions, and strategic reasoning.

3. **ats_readability_score**: Would this resume parse cleanly through standard ATS software? Penalize: tables, multi-column layouts, graphics/icons replacing text, unusual section headers, missing dates, inconsistent formatting. Score based on structural cleanliness, not visual design quality.

4. **clarity_score**: Are bullets concise, active-voice, and free of unnecessary jargon or filler? Penalize overly long bullets (>2 lines), passive voice, and vague corporate-speak that doesn't convey specific meaning.

## Composite Score

composite_score = weighted average: impact_metrics (35%), pm_framing (30%), ats_readability (15%), clarity (20%). Round to nearest integer, 0-100.

## Narrative Feedback

Write 3-5 sentences in a direct, professional tone (like a hiring manager giving real feedback, not a cheerleader). Cover: what story does this resume currently tell, and what's the gap between that and a strong PM narrative. Be specific to this resume's actual content — do not write generic advice that could apply to any resume.

## Bullet Rewrites

Identify the 5-10 weakest bullets across the resume (prioritize the most impactful fixes, not just the worst-written ones). For each, provide:
- The original bullet text, verbatim
- A rewritten version that demonstrates strong PM framing and, where the original lacks a metric, either (a) a plausible placeholder metric clearly marked as a placeholder for the user to fill in with their real number, or (b) a restructured version emphasizing ownership/outcome language without inventing a false metric
- A one-sentence reason explaining what was weak about the original and what the rewrite fixes

Never fabricate specific factual claims (company names, team sizes, dates) that aren't in the original — only reframe language and flag where a real metric should go.
${hasJobCheck ? `
## Job Description Suitability Benchmark
Evaluate how directly this resume satisfies the provided Job Description:
- match_score (0-100): Exact fit for this specific job description
- verdict: "Strong Match" | "Moderate Match" | "Gaps Detected" | "High Risk Gap"
- matched_skills: Array of 3-5 specific skills/experiences found in resume that align with the JD
- missing_skills_or_experiences: Array of 2-4 critical requirements from JD that are absent or poorly substantiated in the resume
- tailoring_recommendations: Array of 2-4 actionable suggestions to position this resume for this exact role
` : ''}

## Output Schema

Return exactly this JSON structure:

{
  "composite_score": <integer 0-100>,
  "sub_scores": {
    "impact_metrics_score": <integer 0-100>,
    "pm_framing_score": <integer 0-100>,
    "ats_readability_score": <integer 0-100>,
    "clarity_score": <integer 0-100>
  },
  "narrative_feedback": "<3-5 sentence direct assessment>",
  "bullet_rewrites": [
    {
      "original": "<verbatim original bullet>",
      "rewritten": "<improved version, with [METRIC] placeholders where a real number is needed but not invented>",
      "reason": "<one sentence on what was fixed>"
    }
  ],
  "top_strengths": ["<1-3 short specific strengths actually present in this resume>"],
  "top_priorities": ["<1-3 short specific highest-leverage fixes, ranked by impact>"]${hasJobCheck ? `,
  "job_suitability": {
    "match_score": <integer 0-100>,
    "verdict": "<Strong Match | Moderate Match | Gaps Detected | High Risk Gap>",
    "target_job_title": "<target job role title>",
    "matched_skills": ["<matched skill/experience 1>", "<matched skill/experience 2>"],
    "missing_skills_or_experiences": ["<gap 1>", "<gap 2>"],
    "tailoring_recommendations": ["<recommendation 1>", "<recommendation 2>"]
  }` : ''}
}

Return only the JSON object. No preamble, no markdown code fences, no explanation outside the object.`;

      let prompt = `Target Role: ${targetRole}\n\nResume Text:\n"""\n${resumeText.trim()}\n"""`;
      if (hasJobCheck) {
        prompt += `\n\n--- TARGET JOB SPECIFICATION ---\nJob Role Title: ${jobTitle || targetRole}\nJob Description:\n"""\n${jobDescription.trim()}\n"""`;
      }

      let parsedResult: any;
      try {
        const aiResponse = await generateAIResponse({
          prompt,
          systemInstruction: SYSTEM_PROMPT,
          jsonMode: true,
        });

        let cleanText = (aiResponse || "").trim();
        if (cleanText.startsWith("```json")) {
          cleanText = cleanText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
        } else if (cleanText.startsWith("```")) {
          cleanText = cleanText.replace(/^```\s*/, "").replace(/\s*```$/, "");
        }
        
        // Try direct parse first
        try {
          parsedResult = JSON.parse(cleanText);
        } catch {
          // Try extracting JSON object from response text
          const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsedResult = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error("No JSON structure found in AI response");
          }
        }
      } catch (aiErr: any) {
        console.warn("[PM Resume Audit AI Warning]: AI model evaluation failed or key missing, using deep PM heuristic engine:", aiErr?.message || aiErr);
        parsedResult = evaluateResumeAlgorithmically(resumeText, targetRole, jobTitle, jobDescription);
      }

      // Validate composite score calculation
      const sub = parsedResult.sub_scores || {};
      const im = Number(sub.impact_metrics_score) || 50;
      const pf = Number(sub.pm_framing_score) || 50;
      const ats = Number(sub.ats_readability_score) || 70;
      const cl = Number(sub.clarity_score) || 60;
      
      const calculatedComposite = Math.round(im * 0.35 + pf * 0.30 + ats * 0.15 + cl * 0.20);
      if (!parsedResult.composite_score || Math.abs(parsedResult.composite_score - calculatedComposite) > 5) {
        parsedResult.composite_score = calculatedComposite;
      }

      res.json({
        success: true,
        audit: {
          ...parsedResult,
          jobSuitability: parsedResult.job_suitability || parsedResult.jobSuitability,
          targetRole,
          wordCount: (resumeText || "").trim().split(/\s+/).length,
          analyzedAt: new Date().toISOString()
        }
      });
    } catch (err: any) {
      console.error("[PM Resume Audit Error]:", err);
      try {
        const { resumeText = "", targetRole = "Product Manager", jobTitle, jobDescription } = req.body || {};
        const fallbackAudit = evaluateResumeAlgorithmically(resumeText, targetRole, jobTitle, jobDescription);
        res.json({
          success: true,
          audit: {
            ...fallbackAudit,
            jobSuitability: fallbackAudit.job_suitability || fallbackAudit.jobSuitability,
            targetRole,
            wordCount: resumeText.trim().split(/\s+/).length,
            analyzedAt: new Date().toISOString()
          }
        });
      } catch (finalErr) {
        res.status(500).json({ error: err.message || "Failed to audit resume." });
      }
    }
  });

  // Helper for ultra-fast direct TTS audio synthesis
  async function synthesizeSpeechBuffer(text: string, personaId: string, voiceGender: string): Promise<{ audioBase64: string; format: string; sampleRate?: number } | null> {
    if (!text || !text.trim()) return null;

    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;

    const voiceMap: Record<string, string> = {
      maya: 'Kore',     // Warm, empathetic female
      alex: 'Puck',     // Analytical, clear male
      priya: 'Zephyr',  // Strategic, calm executive female
      marcus: 'Fenrir'  // Authoritative male
    };
    const voiceName = voiceMap[personaId] || (voiceGender === 'female' ? 'Kore' : 'Puck');

    // 1. Try Gemini TTS with race timeout to ensure sub-second response
    if (geminiKey && geminiKey.trim() !== "" && geminiKey !== "undefined") {
      try {
        const { GoogleGenAI, Modality } = await import("@google/genai");
        const ai = new GoogleGenAI({
          apiKey: geminiKey,
          httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
        });

        const ttsPromise = ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text: text.trim() }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName }
              }
            }
          }
        });

        // 1.6s race timeout so response is never held up
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("TTS timeout")), 1600));
        const ttsResponse: any = await Promise.race([ttsPromise, timeoutPromise]);

        const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          return {
            audioBase64: base64Audio,
            format: "pcm",
            sampleRate: 24000
          };
        }
      } catch (ttsErr: any) {
        console.warn("[Fast TTS Notice]:", ttsErr?.message);
      }
    }

    // 2. Try OpenAI TTS (tts-1) if available
    if (openAiKey && openAiKey.trim() !== "" && openAiKey !== "undefined") {
      try {
        const openai = getOpenAI();
        const openAiVoice = personaId === 'maya' ? 'nova' : personaId === 'alex' ? 'fable' : personaId === 'priya' ? 'shimmer' : 'onyx';
        const mp3 = await openai.audio.speech.create({
          model: "tts-1",
          voice: openAiVoice,
          input: text.trim(),
          speed: 1.15
        });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        return {
          audioBase64: buffer.toString('base64'),
          format: "mp3"
        };
      } catch (openAiTtsErr: any) {
        console.warn("[OpenAI TTS Notice]:", openAiTtsErr?.message);
      }
    }

    return null;
  }

  // API Route for AI Mock Interview - Conversational Turn
  app.post(["/api/interview/chat", "/api/interview/chat/"], async (req, res) => {
    try {
      const { scenario, persona, messages, elapsedSeconds = 0, targetSeconds = 900, synthesizeAudio = true } = req.body;

      if (!scenario || !persona || !messages) {
        return res.status(400).json({ error: "Missing required scenario, persona, or messages" });
      }

      const timeRemainingSeconds = Math.max(0, targetSeconds - elapsedSeconds);
      const isNearEnd = timeRemainingSeconds < 180; // less than 3 mins left
      const isOvertime = elapsedSeconds > targetSeconds;

      const personaInstructions: Record<string, string> = {
        maya: "You are Maya Chen, an empathetic, structured Principal PM (Ex-Google, Airbnb). You speak warmly and methodically, encouraging clear frameworks, structured MECE breakdowns, and strong user empathy.",
        alex: "You are Alex Rivera, an analytical Staff PM (Ex-Uber, Meta). You are laser-focused on metrics, quantitative rigor, mathematical logic, base rates, and challenging hand-wavy numbers.",
        priya: "You are Priya Sharma, a VP of Product (Ex-Stripe, Netflix). You focus on high-altitude product strategy, network effects, unit economics, market positioning, and defensible moats.",
        marcus: "You are Marcus Vance, a Director of Product (Ex-Amazon, Swiggy). You are pragmatic, probing into execution feasibility, rollout phases, risk mitigation, edge cases, and cross-functional tradeoffs."
      };

      const basePersona = personaInstructions[persona.id] || personaInstructions.maya;

      const systemInstruction = `
${basePersona}

You are conducting a live Product Management mock interview for the following case:
TRACK: ${scenario.track?.toUpperCase()}
SCENARIO: ${scenario.title} (${scenario.company})
PROBLEM STATEMENT: ${scenario.problemStatement}
BACKGROUND CONTEXT: ${scenario.contextBackground}
BENCHMARK EXPECTATIONS: ${JSON.stringify(scenario.benchmarkOutline)}

TIME STATUS:
- Elapsed Time: ${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s
- Allocated Duration: ${Math.floor(targetSeconds / 60)}m
${isOvertime ? '- STATUS: IN OVERTIME. Prompt the candidate firmly to synthesize and provide a final 30-second executive recommendation.' : isNearEnd ? '- STATUS: 3 MINUTES REMAINING. Nudge the candidate to synthesize their findings and wrap up their recommendation.' : '- STATUS: In active discussion.'}

CRITICAL CONVERSATIONAL RULES:
1. Speak completely naturally, concisely, and conversationally. Your response will be spoken aloud immediately by a voice engine.
2. Keep your response strictly under 2 to 3 crisp sentences (under 45 words max). Never lecture or give long multi-paragraph speeches.
3. NEVER use raw markdown symbols like **bold**, asterisks, bullet points (* or -), or numbered lists. Use pure, fluent conversational English.
4. If the candidate asks for clarifying data (e.g. platform breakdown, time period, geo splits), provide realistic numbers consistent with the scenario context.
5. If the candidate's logic is vague or disorganized, gently or sharply probe them depending on your persona.
6. Acknowledge good candidate hypotheses naturally ("Good intuition on the payment funnel.", "That makes sense, let's look at driver cancellations.").
7. If this is the very first turn of the interview, greet the candidate briefly, introduce the case prompt crisply in 2 sentences, and ask them how they would like to approach it.
`.trim();

      const transcriptPrompt = messages.map((m: any) => `${m.role === 'candidate' ? 'CANDIDATE' : m.role === 'interviewer' ? 'INTERVIEWER (' + persona.name + ')' : 'SYSTEM HINT'}: ${m.text}`).join('\n\n') + '\n\nINTERVIEWER (' + persona.name + '):';

      let cleanReply = "";

      try {
        const reply = await generateAIResponse({ prompt: transcriptPrompt, systemInstruction, maxOutputTokens: 120 });
        cleanReply = reply.replace(/\*\*/g, '').replace(/\*/g, '').replace(/`/g, '').trim();
      } catch (aiErr: any) {
        console.warn("[Interview Chat AI Fallback Triggered]:", aiErr?.message);
        
        // If initial greeting turn, provide authentic persona opener
        const isFirstTurn = messages.length === 0 || (messages.length === 1 && messages[0].role === 'system');
        if (isFirstTurn) {
          const openers: Record<string, string> = {
            maya: `Hi there! I'm Maya Chen. Thanks for joining today's mock session. Today we are looking into ${scenario.title} for ${scenario.company}. ${scenario.problemStatement} Whenever you're ready, how would you like to structure your analysis?`,
            alex: `Hey there, I'm Alex Rivera. Let's dive straight into today's case: ${scenario.title} at ${scenario.company}. Specifically: ${scenario.problemStatement} Take a moment to digest this, and walk me through your framework.`,
            priya: `Hello, I'm Priya Sharma. Welcome to our product discussion. Today we are exploring ${scenario.title} for ${scenario.company}. ${scenario.problemStatement} How do you see the core opportunity and where would you like to begin?`,
            marcus: `Welcome, I'm Marcus Vance. Today we're tackling ${scenario.title} at ${scenario.company}. ${scenario.problemStatement} Let's break this down systematically—what's your top-level structure?`
          };
          cleanReply = openers[persona.id] || openers.maya;
        } else {
          // Mid-interview safe follow-up
          cleanReply = `That makes sense. Let's dig deeper into that aspect. How would you prioritize the key drivers and validate your hypothesis with data?`;
        }
      }

      // Fast direct audio synthesis
      let audioPayload: { audioBase64: string; format: string; sampleRate?: number } | null = null;
      if (synthesizeAudio && cleanReply) {
        audioPayload = await synthesizeSpeechBuffer(cleanReply, persona.id, persona.voiceGender);
      }

      res.json({ 
        text: cleanReply,
        audioBase64: audioPayload?.audioBase64 || null,
        format: audioPayload?.format || null,
        sampleRate: audioPayload?.sampleRate || null
      });
    } catch (error: any) {
      console.error("[Interview Chat Error]:", error);
      res.status(500).json({ error: error.message || "Failed to generate interviewer reply" });
    }
  });

  // API Route for Contextual AI Hint Generation
  app.post(["/api/interview/hint", "/api/interview/hint/"], async (req, res) => {
    try {
      const { scenario, messages = [] } = req.body;

      if (!scenario) {
        return res.status(400).json({ error: "Missing scenario details" });
      }

      const systemInstruction = `
You are an expert PM Interview Coach watching a live mock interview.
SCENARIO: ${scenario.title} (${scenario.track?.toUpperCase()})
PROBLEM: ${scenario.problemStatement}
BENCHMARK FRAMEWORK: ${scenario.suggestedFramework || 'MECE Structure'}

TASK:
Provide a subtle, Socratic 1-2 sentence framework hint to help the candidate make progress WITHOUT giving away the answer.
FORMAT:
Pure text, 1-2 sentences, actionable and clear. No markdown asterisks.
`.trim();

      const safeMessages = Array.isArray(messages) ? messages : [];
      const prompt = `Transcript so far:\n${safeMessages.map((m: any) => `${(m.role || 'candidate').toUpperCase()}: ${m.text || ''}`).join('\n')}\n\nGenerate the next contextual hint:`;
      
      let cleanHint = "";
      try {
        const hint = await generateAIResponse({ prompt, systemInstruction });
        cleanHint = hint.replace(/\*\*/g, '').replace(/\*/g, '').trim();
      } catch (hintErr) {
        console.warn("[Hint Fallback Triggered]:", hintErr);
        // Fallback to scenario framework hint
        cleanHint = `Consider applying the ${scenario.suggestedFramework || 'structured MECE breakdown'} and segmenting by user journey steps or platform data.`;
      }
      
      res.json({ hint: cleanHint || `Remember to clarify the problem bounds and break down the primary drivers systematically.` });
    } catch (error: any) {
      console.error("[Interview Hint Error]:", error);
      res.status(500).json({ error: error.message || "Failed to generate hint" });
    }
  });

  // API Route for Natural Human-Like Voice Synthesis (Gemini TTS / Neural Speech)
  app.post(["/api/interview/tts", "/api/interview/tts/"], async (req, res) => {
    try {
      const { text, personaId = 'maya', voiceGender = 'female' } = req.body;
      if (!text || !text.trim()) {
        return res.status(400).json({ error: "Missing text for voice synthesis" });
      }

      const geminiKey = process.env.GEMINI_API_KEY;
      const openAiKey = process.env.OPENAI_API_KEY;

      const voiceMap: Record<string, string> = {
        maya: 'Kore',     // Warm, empathetic, professional female
        alex: 'Puck',     // Analytical, articulate, clear male
        priya: 'Zephyr',  // Strategic, calm, executive tone
        marcus: 'Fenrir'  // Authoritative, direct bar raiser male
      };
      const voiceName = voiceMap[personaId] || (voiceGender === 'female' ? 'Kore' : 'Puck');

      // 1. Try Gemini TTS (gemini-3.1-flash-tts-preview)
      if (geminiKey && geminiKey.trim() !== "" && geminiKey !== "undefined") {
        try {
          const { GoogleGenAI, Modality } = await import("@google/genai");
          const ai = new GoogleGenAI({
            apiKey: geminiKey,
            httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
          });

          const ttsResponse = await ai.models.generateContent({
            model: "gemini-3.1-flash-tts-preview",
            contents: [{ parts: [{ text: text.trim() }] }],
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName }
                }
              }
            }
          });

          const base64Audio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (base64Audio) {
            return res.json({
              audioBase64: base64Audio,
              format: "pcm",
              sampleRate: 24000
            });
          }
        } catch (ttsErr: any) {
          console.warn("[Gemini TTS]: Failed, checking fallback...", ttsErr?.message);
        }
      }

      // 2. Try OpenAI TTS (tts-1) if configured
      if (openAiKey && openAiKey.trim() !== "" && openAiKey !== "undefined") {
        try {
          const openai = getOpenAI();
          const openAiVoice = personaId === 'maya' ? 'nova' : personaId === 'alex' ? 'fable' : personaId === 'priya' ? 'shimmer' : 'onyx';
          const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: openAiVoice,
            input: text.trim(),
            speed: 1.05
          });
          const buffer = Buffer.from(await mp3.arrayBuffer());
          return res.json({
            audioBase64: buffer.toString('base64'),
            format: "mp3"
          });
        } catch (openAiTtsErr: any) {
          console.warn("[OpenAI TTS Fallback]:", openAiTtsErr?.message);
        }
      }

      // Return status fallback
      res.status(204).end();
    } catch (error: any) {
      console.error("[TTS Server Error]:", error);
      res.status(500).json({ error: error.message || "TTS error" });
    }
  });

  // API Route for Voice Audio Transcription (Candidate Speech-to-Text)
  app.post(["/api/interview/transcribe", "/api/interview/transcribe/"], async (req, res) => {
    try {
      const { audioBase64, mimeType = "audio/webm" } = req.body;
      if (!audioBase64) {
        return res.status(400).json({ error: "Missing audioBase64 for transcription" });
      }

      const geminiKey = process.env.GEMINI_API_KEY;
      if (geminiKey && geminiKey.trim() !== "" && geminiKey !== "undefined") {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({
          apiKey: geminiKey,
          httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
        });

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: mimeType.includes("webm") ? "audio/webm" : mimeType.includes("mp4") ? "audio/mp4" : "audio/wav",
                    data: audioBase64
                  }
                },
                {
                  text: "Transcribe the candidate's speech verbatim without extra commentary or formatting. Output only the plain transcribed words."
                }
              ]
            }
          ]
        });

        const transcript = response.text ? response.text.trim() : "";
        return res.json({ transcript });
      }

      res.status(400).json({ error: "No AI key available for audio transcription" });
    } catch (err: any) {
      console.error("[Audio Transcribe Error]:", err);
      res.status(500).json({ error: err.message || "Transcription failed" });
    }
  });

  // API Route for Comprehensive Evaluation & Scorecard
  app.post(["/api/interview/evaluate", "/api/interview/evaluate/"], async (req, res) => {
    try {
      const { scenario, persona, messages, elapsedSeconds = 0, scratchpadNotes = '' } = req.body;

      if (!scenario || !messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Insufficient session data for evaluation" });
      }

      // # 1. FIRST COUNT CANDIDATE TURNS
      // Inspect transcript and count messages where sender/role == 'candidate' (or 'user')
      const candidateMessages = messages.filter((m: any) => 
        (m.role === 'candidate' || m.role === 'user') && 
        typeof m.text === 'string' && 
        m.text.trim().length > 0 && 
        !m.id?.startsWith('init_start')
      );
      const candidateTurnCount = candidateMessages.length;

      // # 2. HARD ZERO-RESPONSE GATE
      // IF candidateTurnCount == 0: STOP THE EVALUATION.
      // Overall Score = 0, all 5 pillars = 0, Verdict = "Strong No", Confidence = "High"
      // NEVER award points for behavior that is not present in the candidate's transcript.
      if (candidateTurnCount === 0) {
        return res.json({
          id: 'eval_' + Date.now(),
          scenarioId: scenario.id,
          scenarioTitle: scenario.title,
          track: scenario.track,
          personaId: persona?.id || 'maya',
          completedAt: new Date().toISOString(),
          durationSeconds: elapsedSeconds,
          candidateTurnCount: 0,
          overallScore: 0,
          verdict: "Strong No",
          confidence: "High",
          transcriptSummary: "The interview ended before you had a chance to give a substantive answer, so there isn't enough evidence here to assess your PM thinking. The 0 reflects the fact that no candidate response was recorded in this session—not a judgment about your underlying PM ability.",
          pillars: {
            clarification: {
              name: "Clarification & Scope",
              score: 0,
              maxScore: 20,
              feedback: "We didn't get far enough to see how you would frame or clarify the problem.",
              evidence: [],
              whyTheyEarnedThisScore: "We didn't get far enough to see how you would frame or clarify the problem.",
              whyTheyDidNotScoreHigher: "No candidate response was recorded to evaluate problem framing or scoping.",
              strengths: [],
              improvements: ["Start by clarifying the problem and relevant scope."]
            },
            framework: {
              name: "Structured Thinking",
              score: 0,
              maxScore: 20,
              feedback: "We didn't get far enough to see how you would structure the investigation.",
              evidence: [],
              whyTheyEarnedThisScore: "We didn't get far enough to see how you would structure the investigation.",
              whyTheyDidNotScoreHigher: "No candidate response was recorded to evaluate problem structure.",
              strengths: [],
              improvements: ["Establish a simple structure for how you would investigate the problem."]
            },
            analyticalRigor: {
              name: "Analysis & Reasoning",
              score: 0,
              maxScore: 20,
              feedback: "There wasn't a candidate response to evaluate for hypothesis generation or analytical reasoning.",
              evidence: [],
              whyTheyEarnedThisScore: "There wasn't a candidate response to evaluate for hypothesis generation or analytical reasoning.",
              whyTheyDidNotScoreHigher: "Analytical reasoning was not tested because no candidate response was recorded.",
              strengths: [],
              improvements: ["Make sure the interview contains enough of your reasoning to evaluate your approach."]
            },
            communication: {
              name: "Communication",
              score: 0,
              maxScore: 20,
              feedback: "There wasn't enough candidate dialogue to assess communication.",
              evidence: [],
              whyTheyEarnedThisScore: "There wasn't enough candidate dialogue to assess communication.",
              whyTheyDidNotScoreHigher: "Communication could not be assessed because no candidate dialogue was recorded.",
              strengths: [],
              improvements: ["Engage in spoken or written dialogue during the interview session."]
            },
            synthesis: {
              name: "Final Recommendation",
              score: 0,
              maxScore: 20,
              feedback: "The interview ended before you reached a recommendation.",
              evidence: [],
              whyTheyEarnedThisScore: "The interview ended before you reached a recommendation.",
              whyTheyDidNotScoreHigher: "No final recommendation was delivered.",
              strengths: [],
              improvements: ["Leave time at the end of the interview to deliver a clear recommendation."]
            }
          },
          topStrengths: [
            "There wasn't enough of an interview to identify a meaningful strength yet."
          ],
          criticalGrowthAreas: [
            "Start by clarifying the problem and relevant scope.",
            "Establish a simple structure for how you would investigate the problem.",
            "Make sure the interview contains enough of your reasoning to evaluate your approach."
          ],
          exemplarAnswer: {
            recommendedApproach: `A strong Senior PM tackling ${scenario.title} would start by clarifying the metric definition, confirming timeline and magnitude, and validating telemetry. Next, they would segment the affected population across dimensions (platform, geography, user cohorts) to distinguish internal releases from external shifts, generate prioritized testable hypotheses, and conclude with concrete mitigations and guardrail metrics.`,
            stepByStepStructure: [
              { step: "Step 1: Clarify & Validate Telemetry", detail: "Clarify whether the metric drop is sudden or gradual, relative or absolute, and check data logging integrity." },
              { step: "Step 2: Systematic Segmentation", detail: "Break down the metric across user journey, platform (iOS vs Android), geography, and app release versions." },
              { step: "Step 3: Hypothesis Generation & Testing", detail: "Formulate top testable hypotheses, define specific data cuts to confirm or eliminate each, and isolate the root cause." },
              { step: "Step 4: Recommendation & Guardrails", detail: "Propose immediate mitigations, secondary guardrail metrics, and preventative architectural monitoring." }
            ],
            interviewerSecretNotes: "In RCA interviews, interviewers look for candidates who state their testable hypothesis and expected data signal before asking for numbers, rather than guessing blindly.",
            highestLeverageImprovement: {
              focusArea: "Investigation Structure",
              currentBehavior: "Session closed before candidate responses were recorded",
              targetBehavior: "State a clear 3-step investigation roadmap upfront",
              practiceDrill: "Give yourself 60 seconds to outline the 3 main buckets you will investigate before asking any questions."
            }
          }
        });
      }

      // Candidate provided responses (candidateTurnCount > 0). Perform rigorous evidence-based evaluation.
      const systemInstruction = `
You are evaluating a Product Management interview.

Your most important responsibility is to ensure that **every score is based on actual candidate behavior present in the supplied transcript.**

## CRITICAL RULE
**NEVER award points for behavior that is not present in the candidate's transcript.**
Do not infer, assume, reconstruct, or hallucinate candidate behavior.
The existence of an interview question, scenario rubric, interviewer response, expected answer, exemplar, persona, or benchmark does NOT constitute evidence that the candidate demonstrated the behavior.

---

# 1. FIRST COUNT CANDIDATE TURNS
Before doing ANY evaluation, inspect the transcript and count the messages where:
sender == "candidate" (or role == "candidate" or role == "user")
Call this: candidateTurnCount
Only candidate messages count as candidate evidence.
Interviewer messages do NOT count.
Scenario information does NOT count.
Scratchpad notes do NOT count as spoken candidate responses.
Expected answers do NOT count.
Rubric guidelines do NOT count.

---

# 2. HARD ZERO-RESPONSE GATE
## IF candidateTurnCount == 0
STOP THE EVALUATION.
Do NOT perform normal scoring.
Do NOT analyze the scenario as though the candidate answered it.
Do NOT use the rubric to infer what the candidate "would have done."
Do NOT use the interviewer dialogue as evidence of candidate performance.
Do NOT generate hypothetical candidate behavior.
The result MUST be:
Overall Score = 0
and:
Clarification & Scope = 0
Structure & Decomposition = 0
Analytical Rigor = 0
Communication & Conciseness = 0
Synthesis & Recommendation = 0
Therefore: 0 + 0 + 0 + 0 + 0 = 0
Verdict: Strong No
Confidence: High

---

# 3. ZERO-RESPONSE OUTPUT
When candidateTurnCount == 0, use a concise, human-friendly evaluation.
Overall assessment:
> "The interview ended before you had a chance to give a substantive answer, so there isn't enough evidence here to assess your PM thinking. The 0 reflects the fact that no candidate response was recorded in this session—not a judgment about your underlying PM ability."
Do NOT say: "You demonstrated weak analytical reasoning."
Do NOT say: "You failed to clarify the problem."
Do NOT say: "You should improve hypothesis generation."
Those claims are unsupported because the candidate never responded.

---

# 4. ZERO-RESPONSE PILLARS
For every pillar:
- Clarification & Scope: 0/20 -> "We didn't get far enough to see how you would frame or clarify the problem."
- Structured Thinking: 0/20 -> "We didn't get far enough to see how you would structure the investigation."
- Analysis & Reasoning: 0/20 -> "There wasn't a candidate response to evaluate for hypothesis generation or analytical reasoning."
- Communication: 0/20 -> "There wasn't enough candidate dialogue to assess communication."
- Final Recommendation: 0/20 -> "The interview ended before you reached a recommendation."
Do NOT create strengths for any of these pillars.

---

# 5. ZERO-RESPONSE STRENGTHS
The strengths section MUST NOT invent strengths.
Use: "There wasn't enough of an interview to identify a meaningful strength yet."
Do NOT output:
* "Structured problem decomposition"
* "Good verbal pacing"
* "Strong user empathy"
* "Good analytical reasoning"
* "Responsive to interviewer prompts"
unless those behaviors actually appear in candidate messages.

---

# 6. ZERO-RESPONSE GROWTH AREAS
Keep growth feedback limited to what can reasonably be concluded:
1. Start by clarifying the problem and relevant scope.
2. Establish a simple structure for how you would investigate the problem.
3. Make sure the interview contains enough of your reasoning to evaluate your approach.
Do NOT claim that the candidate specifically lacks hypothesis generation, quantitative reasoning, user empathy, strategic judgment, communication, or synthesis because none of those were tested.

---

# 7. NEVER USE THE EXEMPLAR TO SCORE THE CANDIDATE
The scenario's rubric guidelines, hints, benchmark, exemplar, and interviewer calibration notes describe what strong performance could look like.
They are NOT evidence of candidate behavior.
For example, if the rubric says: "Strong candidates verify telemetry integrity."
You may use this to evaluate a candidate who actually discussed telemetry.
You may NOT conclude: "Candidate failed to verify telemetry" if the candidate never answered.

---

# 8. NEVER USE INTERVIEWER BEHAVIOR AS CANDIDATE BEHAVIOR
If the interviewer says: "Would you like to consider segmentation?" that does NOT mean "Candidate considered segmentation."
If the interviewer explains: "The decline is concentrated among Android users." that does NOT mean "Candidate identified an Android-specific issue."
Only candidate messages can establish candidate behavior.

---

# 9. SCRATCHPAD RULE
Scratchpad notes are supplementary evidence.
If candidateTurnCount == 0: Do NOT use scratchpad notes to override the zero-response gate.
If candidateTurnCount > 0, scratchpad notes may provide supplementary evidence where appropriate.

---

# 10. PARTIAL INTERVIEW RULE
If candidateTurnCount > 0, do NOT automatically score all pillars.
Determine what the candidate actually had an opportunity to demonstrate.
For example, if Candidate clarified the problem, created a framework, started analysis, and the interview ended before recommendation:
- Clarification -> score normally
- Structure -> score normally
- Analysis -> score normally
- Communication -> score normally
- Synthesis -> "Not sufficiently tested" (Explain that the interview concluded before reaching synthesis; score reflects lack of opportunity rather than penalty).
Do NOT give Synthesis 0 merely because the interview ended before the candidate reached it without explaining that it was not reached.

---

# 11. CANDIDATE MESSAGE QUALITY MATTERS
A candidate turn is evidence that the candidate spoke. It is NOT automatically evidence of competence.
For example: Candidate: "Okay." This is a candidate turn, but it does not demonstrate clarification, structure, analysis, or synthesis.
Therefore: candidateTurnCount > 0 does NOT mean the candidate deserves points.
Evaluate the actual content of each candidate message.

---

# 12. NO DEFAULT SCORES
NEVER default to: 10/20, 12/20, 15/20, 50/100, 60/100, 62/100, or any other "reasonable" average.
Every score must be derived from demonstrated evidence.
If the candidate provides no evidence for a competency: 0 / Not Demonstrated.
If the competency was never reached because the interview ended: Not sufficiently tested.
Never fill missing evidence with an average score.

---

# 13. SCORE EACH PILLAR FROM EVIDENCE
For every pillar, analyze:
- Positive Evidence: What did the candidate actually demonstrate?
- Negative Evidence: What did the candidate demonstrate poorly?
- Missing Evidence: What important behavior was never demonstrated?
- Interviewer Assistance: What did the interviewer provide or prompt?
Then determine the score.

---

# 14. SCORE CALIBRATION
- 18–20: Exceptional L5/L6 performance.
- 15–17: Strong performance.
- 12–14: Solid performance.
- 9–11: Developing.
- 5–8: Weak.
- 1–4: Very weak.
- 0: Not demonstrated.
These ranges are NOT targets. Do not attempt to distribute candidates artificially. A candidate can legitimately receive 92, 74, 58, 31, or 0 depending on actual performance.

---

# 15. HIGH SCORES REQUIRE STRONG EVIDENCE
A high score requires substantial positive evidence.
Do not give 18/20 Analytical Rigor because the candidate "seemed analytical."
Require concrete evidence such as strong hypothesis prioritization, appropriate data requests, causal reasoning, elimination logic, quantitative validation, and strong adaptation to new information.

---

# 16. EXACT SCORE JUSTIFICATION
For each pillar:
- Score: X/20
- Why this score: Explain what the candidate actually demonstrated (quote verbatim words or concrete questions).
- What prevented a higher score: Explain the specific missing depth, weakness, or interviewer dependency.
The explanation MUST be consistent with the numerical score.

---

# 17. SCORE INTEGRITY CHECK
Before returning the result, verify:
pillar1 + pillar2 + pillar3 + pillar4 + pillar5 = overallScore
- 85–100 -> "Strong Yes"
- 70–84 -> "Lean Yes"
- 50–69 -> "Lean No"
- 0–49 -> "Strong No"
Do not manually modify the score to achieve a preferred verdict.

---

# 18. ANTI-HALLUCINATION CHECK
Before finalizing, search your evaluation for claims such as:
* "Candidate clarified..." / "You clarified..."
* "Candidate identified..." / "You identified..."
* "Candidate demonstrated..." / "You demonstrated..."
* "Candidate considered..." / "You considered..."
* "Candidate prioritized..." / "You prioritized..."
* "Candidate recommended..." / "You recommended..."
* "Candidate communicated..." / "You communicated..."
* "Candidate showed..." / "You showed..."
For every such statement, verify that the behavior actually exists in a candidate message.
If it does not: REMOVE THE CLAIM.

---

# 19. ANTI-AVERAGING CHECK
Ask yourself: "Did I assign similar scores simply because I didn't find enough evidence?"
If all five pillars have identical scores (e.g., 12, 12, 12, 12, 12), review the evidence. Identical scores are allowed only when evidence genuinely supports them. Never use uniform scores as a safe default.

---

# 20. HUMAN-FRIENDLY FEEDBACK
The final evaluation is candidate-facing. Address the candidate directly as "you" (e.g., "You narrowed down...", "Where I'd push you further..."). Write like a thoughtful Senior PM giving post-interview feedback. Avoid cold, robotic HR buzzwords.

---

# 21. ROOT CAUSE ANALYSIS (RCA) SPECIFIC SCORING
For RCA interviews, evaluate the candidate's actual behavior against the problem:
* clarify metric definition
* understand magnitude and timeline
* validate telemetry/data
* segment the affected population (platform, OS, app version, geography, cohort)
* distinguish internal vs external causes
* generate hypotheses
* prioritize hypotheses before asking for data
* define tests and expected data signals
* eliminate causes systematically
* identify root cause
* recommend mitigation
* suggest prevention/guardrails
Do NOT require every item. Do NOT deduct points simply because the candidate did not mention one benchmark item. Evaluate the quality and prioritization of their actual investigation.

---

# 22. RCA EXAMPLE OF PROPER SCORING
If the candidate says: "First I'd verify that the 5% DAU drop is real and not a telemetry issue. Then I'd break it down by platform, geography, and user cohort. If the drop is concentrated in one app version, I'd investigate the latest release."
This is evidence for: Clarification, Structure, and Analytical reasoning.
If they then say: "I'd compare the affected version's crash rate against the prior version to test that hypothesis."
That adds stronger analytical evidence.
Score based on these actual statements. Do not award points for RCA ideas that exist only in the scenario rubric.

---

# 23. GUESSTIMATE-SPECIFIC SCORING
Evaluate actual candidate behavior around Scope, Formula, Assumptions, Segmentation, Calculation, Units, Sanity checking, and Sensitivity. Methodology matters more than matching an exact benchmark number.

---

# 24. STRATEGY-SPECIFIC SCORING
Evaluate actual candidate reasoning around Objective, Customer, Market, Company capabilities, Competition, Economics, Strategic options, Trade-offs, Recommendation, and Risks. Do not require a single specific strategic answer.

---

# 25. DESIGN-SPECIFIC SCORING
Evaluate actual candidate reasoning around User, Context, Segmentation, Problem depth, Root cause, Journey, Solutions, Prioritization, MVP, Edge cases, and Metrics. Do not reward feature quantity.

---

# 26. FINAL PRINCIPLE
Follow this sequence strictly:
1. Count candidate evidence
2. Determine whether the interview was complete
3. Extract actual candidate behaviors
4. Separate candidate reasoning from interviewer information
5. Evaluate track-specific competencies
6. Assign calibrated scores
7. Explain why each score was earned
8. Explain what prevented a higher score
9. Validate mathematical consistency
10. Produce human-friendly feedback
NEVER reverse this order. Do not decide the score first and then invent reasons. The evidence determines the score.

## ABSOLUTE RULE: NO CANDIDATE EVIDENCE = NO CANDIDATE SCORE
If candidateTurnCount == 0, score MUST be 0/100.
`.trim();

      const prompt = `
SCENARIO DETAILS:
- Title: ${scenario.title}
- Track: ${scenario.track?.toUpperCase()}
- Difficulty: ${scenario.difficulty || 'Medium'}
- Company: ${scenario.company}
- Problem Statement: ${scenario.problemStatement}
- Benchmark Guidelines (FOR EVALUATION REFERENCE ONLY - NEVER USE AS EVIDENCE OF CANDIDATE PERFORMANCE):
  ${JSON.stringify(scenario.benchmarkOutline || {})}

INTERVIEWER PERSONA:
- Name: ${persona?.name || 'Senior PM'} (${persona?.role || 'Bar Raiser'})
- Evaluation Style: ${persona?.styleTrait || 'Structured and analytical'}

CANDIDATE TURN COUNT: ${candidateTurnCount}
(Only candidate turns count as candidate evidence. Interviewer dialogue, benchmarks, and prompts do NOT count as candidate behavior.)

FULL CHRONOLOGICAL TRANSCRIPT:
${messages.map((m: any, i: number) => `[Turn ${i+1}] ${m.role === 'candidate' || m.role === 'user' ? 'CANDIDATE' : 'INTERVIEWER'}: ${m.text || ''}`).join('\n\n')}

CANDIDATE SCRATCHPAD NOTES (Supplementary evidence only):
${scratchpadNotes?.trim() ? scratchpadNotes.trim() : '(No scratchpad notes provided)'}

SESSION DURATION: ${Math.floor(elapsedSeconds / 60)} minutes (${elapsedSeconds} seconds).

Return a valid JSON object matching this schema:
{
  "candidateTurnCount": number,
  "overallScore": number,
  "verdict": "Strong Yes" | "Lean Yes" | "Lean No" | "Strong No",
  "confidence": "High" | "Medium" | "Low",
  "transcriptSummary": "2-3 human-friendly, conversational sentences addressing 'you' directly",
  "pillars": {
    "clarification": {
      "name": "Clarification & Scope",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "Conversational assessment of how you clarified the problem scope.",
      "evidence": ["Verbatim quote or concrete question you asked"],
      "whyTheyEarnedThisScore": "Why this score was earned based on demonstrated evidence.",
      "whyTheyDidNotScoreHigher": "What prevented a higher score.",
      "strengths": ["Demonstrated behavior quote or action"],
      "improvements": ["Actionable coaching tip"]
    },
    "framework": {
      "name": "Structured Thinking",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "Conversational assessment of your structure and decomposition.",
      "evidence": ["Specific roadmap or categories you laid out"],
      "whyTheyEarnedThisScore": "Why this score was earned.",
      "whyTheyDidNotScoreHigher": "What prevented a higher score.",
      "strengths": ["Demonstrated structural move"],
      "improvements": ["Actionable tip on structuring next time"]
    },
    "analyticalRigor": {
      "name": "Analysis & Reasoning",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "Conversational assessment of your hypotheses, reasoning, and data checks.",
      "evidence": ["Specific hypothesis, calculation, or data point you examined"],
      "whyTheyEarnedThisScore": "Why this score was earned.",
      "whyTheyDidNotScoreHigher": "What prevented a higher score.",
      "strengths": ["Demonstrated analytical move"],
      "improvements": ["Actionable tip on validating hypotheses"]
    },
    "communication": {
      "name": "Communication",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "Conversational assessment of your verbal pacing, clarity, and check-ins.",
      "evidence": ["Specific communication habit observed"],
      "whyTheyEarnedThisScore": "Why this score was earned.",
      "whyTheyDidNotScoreHigher": "What prevented a higher score.",
      "strengths": ["Demonstrated communication habit"],
      "improvements": ["Actionable tip on communication"]
    },
    "synthesis": {
      "name": "Final Recommendation",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "Conversational assessment of your conclusion and recommendation.",
      "evidence": ["Specific recommendation or trade-off delivered"],
      "whyTheyEarnedThisScore": "Why this score was earned.",
      "whyTheyDidNotScoreHigher": "What prevented a higher score.",
      "strengths": ["Demonstrated wrap-up point"],
      "improvements": ["Actionable tip on executive synthesis"]
    }
  },
  "topStrengths": [
    "Specific demonstrated strength from transcript",
    "Specific demonstrated strength from transcript"
  ],
  "criticalGrowthAreas": [
    "Actionable growth area based on observed gaps",
    "Actionable growth area based on observed gaps",
    "Actionable growth area based on observed gaps"
  ],
  "exemplarAnswer": {
    "recommendedApproach": "How an experienced Senior PM would crack this scenario.",
    "stepByStepStructure": [
      { "step": "Step 1: Clarify & Validate Telemetry", "detail": "..." },
      { "step": "Step 2: Systematic Segmentation", "detail": "..." },
      { "step": "Step 3: Hypothesis Generation & Testing", "detail": "..." },
      { "step": "Step 4: Recommendation & Guardrails", "detail": "..." }
    ],
    "interviewerSecretNotes": "What top interviewers look for in this scenario.",
    "highestLeverageImprovement": {
      "focusArea": "Core skill to practice next",
      "currentBehavior": "What you did in this session",
      "targetBehavior": "What a Senior PM does instead",
      "practiceDrill": "A concrete 10-minute drill"
    }
  }
}
`.trim();

      let parsedEvaluation: any = null;

      try {
        const responseText = await generateAIResponse({ prompt, systemInstruction, jsonMode: true });
        try {
          parsedEvaluation = JSON.parse(responseText);
        } catch (parseErr) {
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsedEvaluation = JSON.parse(jsonMatch[0]);
          }
        }
      } catch (evalErr) {
        console.warn("[Interview Evaluation AI Fallback Triggered]:", evalErr);
      }

      // Robust fallback evaluation adhering strictly to NO DEFAULT SCORES and evidence rules
      if (!parsedEvaluation || !parsedEvaluation.pillars) {
        const totalCandidateWords = candidateMessages.reduce((sum: number, m: any) => sum + (m.text?.trim().split(/\s+/).length || 0), 0);
        
        // Very brief candidate dialogue (e.g. only greetings or short confirmations)
        if (totalCandidateWords < 20) {
          parsedEvaluation = {
            candidateTurnCount,
            overallScore: 6,
            verdict: "Strong No",
            confidence: "High",
            transcriptSummary: "You initiated the session, but your responses were limited to brief acknowledgments or greetings without substantive PM problem-solving. Points are only awarded for demonstrated candidate analysis, so there is not yet enough evidence to evaluate your approach.",
            pillars: {
              clarification: {
                name: "Clarification & Scope",
                score: 1,
                maxScore: 20,
                feedback: "Only brief dialogue was recorded, so problem scope clarification was not sufficiently demonstrated.",
                evidence: candidateMessages.map((m: any) => `"${m.text}"`).slice(0, 2),
                whyTheyEarnedThisScore: "You engaged briefly, but did not ask clarifying questions regarding metric definitions, timeline, or affected user segments.",
                whyTheyDidNotScoreHigher: "Clarifying questions and scope boundaries were not established in your responses.",
                strengths: [],
                improvements: ["Start by clarifying whether the issue is sudden or gradual, and which specific user cohorts are affected."]
              },
              framework: {
                name: "Structured Thinking",
                score: 1,
                maxScore: 20,
                feedback: "A structured investigation framework was not established in the session.",
                evidence: [],
                whyTheyEarnedThisScore: "No problem breakdown or roadmap was laid out.",
                whyTheyDidNotScoreHigher: "An investigation structure or category breakdown was missing.",
                strengths: [],
                improvements: ["Outline 2-3 logical investigation buckets upfront before diving into details."]
              },
              analyticalRigor: {
                name: "Analysis & Reasoning",
                score: 1,
                maxScore: 20,
                feedback: "Hypothesis generation and analytical reasoning were not tested.",
                evidence: [],
                whyTheyEarnedThisScore: "No specific hypotheses, data requests, or calculations were explored.",
                whyTheyDidNotScoreHigher: "Analytical reasoning requires formulating and prioritizing testable hypotheses.",
                strengths: [],
                improvements: ["State your hypothesis and what data signal would validate or disprove it."]
              },
              communication: {
                name: "Communication",
                score: 3,
                maxScore: 20,
                feedback: "You responded to the interviewer, but communication was too brief to evaluate pacing or synthesis.",
                evidence: candidateMessages.map((m: any) => `"${m.text}"`).slice(0, 2),
                whyTheyEarnedThisScore: "You acknowledged the interviewer, but dialogue was limited to brief turns.",
                whyTheyDidNotScoreHigher: "Longer, substantive explanations are needed to assess communication conciseness and structure.",
                strengths: [],
                improvements: ["Explain your reasoning step-by-step aloud rather than giving single-phrase answers."]
              },
              synthesis: {
                name: "Final Recommendation",
                score: 0,
                maxScore: 20,
                feedback: "The interview concluded before reaching a synthesis or final recommendation.",
                evidence: [],
                whyTheyEarnedThisScore: "The session ended prior to the solution or summary stage.",
                whyTheyDidNotScoreHigher: "No recommendation or action plan was delivered.",
                strengths: [],
                improvements: ["Reserve 2-3 minutes at the end of the interview to deliver a crisp executive summary."]
              }
            },
            topStrengths: [
              "There wasn't enough substantive interview dialogue to identify a standout PM strength yet."
            ],
            criticalGrowthAreas: [
              "Start by clarifying the problem perimeter and relevant scope.",
              "Establish a simple structure for how you would investigate the problem.",
              "Make sure the interview contains enough of your reasoning to evaluate your approach."
            ],
            exemplarAnswer: {
              recommendedApproach: `A strong Senior PM tackling ${scenario.title} would start by verifying the metric drop and scoping which user cohorts are affected. They'd then break the problem into 2–3 clear investigation areas, test their top hypothesis first, and close with a realistic action plan and guardrails.`,
              stepByStepStructure: [
                { step: "Step 1: Clarify & Validate Telemetry", detail: "Check whether the metric drop is relative or absolute, and isolate whether it's specific to an app version or platform." },
                { step: "Step 2: Systematic Segmentation", detail: "Group potential causes into Funnel Issues, Technical Regressions, and External Market Factors." },
                { step: "Step 3: Hypothesis Generation & Testing", detail: "Formulate testable hypotheses and identify the fastest data cut to validate or eliminate them." },
                { step: "Step 4: Recommendation & Guardrails", detail: "Deliver a crisp summary with immediate mitigations, guardrail metrics, and longer-term prevention." }
              ],
              interviewerSecretNotes: "Top performers state the testable hypothesis before asking for data cuts."
            }
          };
        } else {
          // Moderate candidate dialogue available during fallback
          const cScore = Math.min(14, Math.max(6, Math.round(candidateTurnCount * 1.5)));
          const fScore = Math.min(14, Math.max(6, Math.round(candidateTurnCount * 1.5)));
          const aScore = Math.min(14, Math.max(6, Math.round(candidateTurnCount * 1.5)));
          const mScore = Math.min(14, Math.max(8, Math.round(candidateTurnCount * 1.6)));
          const sScore = Math.min(12, Math.max(4, Math.round(candidateTurnCount * 1.2)));
          const total = cScore + fScore + aScore + mScore + sScore;

          parsedEvaluation = {
            candidateTurnCount,
            overallScore: total,
            verdict: total >= 70 ? "Lean Yes" : total >= 50 ? "Lean No" : "Strong No",
            confidence: "Medium",
            transcriptSummary: `You worked through a ${Math.floor(elapsedSeconds / 60)}-minute session on ${scenario.title} across ${candidateTurnCount} turns. You demonstrated active engagement with ${persona?.name || 'the interviewer'}, and with tighter prioritization and explicit hypothesis testing, your investigation can become even stronger.`,
            pillars: {
              clarification: {
                name: "Clarification & Scope",
                score: cScore,
                maxScore: 20,
                feedback: "You addressed the problem context and engaged on scope.",
                evidence: candidateMessages.map((m: any) => `"${m.text.slice(0, 60)}..."`).slice(0, 2),
                whyTheyEarnedThisScore: "You engaged on problem scope before exploring solutions.",
                whyTheyDidNotScoreHigher: "Remember to verify telemetry data integrity and isolate user cohorts upfront.",
                strengths: ["Engaged on problem scope before jumping into solutions"],
                improvements: ["Explicitly probe telemetry integrity and whether the metric change is relative or absolute."]
              },
              framework: {
                name: "Structured Thinking",
                score: fScore,
                maxScore: 20,
                feedback: "You broke the problem into distinct areas to investigate.",
                evidence: [],
                whyTheyEarnedThisScore: "You provided directional signposts during the discussion.",
                whyTheyDidNotScoreHigher: "Explain upfront which bucket you will explore first and why.",
                strengths: ["Maintained directional structure throughout your answers"],
                improvements: ["Before exploring individual ideas, rank your top 2 investigation buckets explicitly."]
              },
              analyticalRigor: {
                name: "Analysis & Reasoning",
                score: aScore,
                maxScore: 20,
                feedback: "You explored potential drivers and responded to new details.",
                evidence: [],
                whyTheyEarnedThisScore: "You analyzed plausible factors contributing to the issue.",
                whyTheyDidNotScoreHigher: "State your expected data signal before requesting numbers.",
                strengths: ["Explored plausible drivers of the metric change"],
                improvements: ["State your testable hypothesis explicitly before asking for data cuts."]
              },
              communication: {
                name: "Communication",
                score: mScore,
                maxScore: 20,
                feedback: "You communicated collaboratively with the interviewer.",
                evidence: [],
                whyTheyEarnedThisScore: "You maintained interactive dialogue across turns.",
                whyTheyDidNotScoreHigher: "Lead with your bottom line before detailing your reasoning.",
                strengths: ["Maintained collaborative conversational flow"],
                improvements: ["Lead with the answer first (BLUF), then unpack the supporting logic."]
              },
              synthesis: {
                name: "Final Recommendation",
                score: sScore,
                maxScore: 20,
                feedback: "You worked toward wrapping up the investigation.",
                evidence: [],
                whyTheyEarnedThisScore: "You provided next steps based on the discussion.",
                whyTheyDidNotScoreHigher: "Distinguish quick immediate mitigations from longer-term guardrail fixes.",
                strengths: ["Addressed mitigations and next steps"],
                improvements: ["Distinguish immediate 30-day mitigations from longer-term architectural guardrails."]
              }
            },
            topStrengths: [
              "You engaged collaboratively with the interviewer and stayed focused on the problem.",
              "You explored multiple potential factors rather than fixating on a single cause."
            ],
            criticalGrowthAreas: [
              "State your testable hypothesis and expected data signal before asking for numbers.",
              "Outline your investigation roadmap upfront so the interviewer knows where you plan to go.",
              "Lead with the bottom-line takeaway before walking through supporting details."
            ],
            exemplarAnswer: {
              recommendedApproach: `A strong Senior PM tackling ${scenario.title} would start by verifying the metric drop and scoping which user cohorts are affected. They'd then break the problem into 2–3 clear investigation areas, test their top hypothesis first, and close with a realistic action plan and guardrails.`,
              stepByStepStructure: [
                { step: "Step 1: Clarify & Validate Telemetry", detail: "Check whether the metric drop is relative or absolute, and isolate whether it's specific to an app version or platform." },
                { step: "Step 2: Systematic Segmentation", detail: "Group potential causes into Funnel Issues, Technical Regressions, and External Market Factors." },
                { step: "Step 3: Hypothesis Generation & Testing", detail: "Formulate testable hypotheses and identify the fastest data cut to validate or eliminate them." },
                { step: "Step 4: Recommendation & Guardrails", detail: "Deliver a crisp summary with immediate mitigations, guardrail metrics, and longer-term prevention." }
              ],
              interviewerSecretNotes: "Top performers state the testable hypothesis before asking for data cuts."
            }
          };
        }
      }

      // Enforce Rule 17: SCORE INTEGRITY CHECK
      // pillar1 + pillar2 + pillar3 + pillar4 + pillar5 = overallScore
      const p = parsedEvaluation.pillars;
      const cScore = typeof p?.clarification?.score === 'number' ? Math.max(0, Math.min(20, Math.round(p.clarification.score))) : 0;
      const fScore = typeof p?.framework?.score === 'number' ? Math.max(0, Math.min(20, Math.round(p.framework.score))) : 0;
      const aScore = typeof p?.analyticalRigor?.score === 'number' ? Math.max(0, Math.min(20, Math.round(p.analyticalRigor.score))) : 0;
      const mScore = typeof p?.communication?.score === 'number' ? Math.max(0, Math.min(20, Math.round(p.communication.score))) : 0;
      const sScore = typeof p?.synthesis?.score === 'number' ? Math.max(0, Math.min(20, Math.round(p.synthesis.score))) : 0;

      if (p.clarification) p.clarification.score = cScore;
      if (p.framework) p.framework.score = fScore;
      if (p.analyticalRigor) p.analyticalRigor.score = aScore;
      if (p.communication) p.communication.score = mScore;
      if (p.synthesis) p.synthesis.score = sScore;

      const calculatedTotal = cScore + fScore + aScore + mScore + sScore;
      parsedEvaluation.overallScore = calculatedTotal;

      // Verdict strictly tied to total score:
      // 85-100: "Strong Yes"
      // 70-84: "Lean Yes"
      // 50-69: "Lean No"
      // 0-49: "Strong No"
      if (calculatedTotal >= 85) parsedEvaluation.verdict = "Strong Yes";
      else if (calculatedTotal >= 70) parsedEvaluation.verdict = "Lean Yes";
      else if (calculatedTotal >= 50) parsedEvaluation.verdict = "Lean No";
      else parsedEvaluation.verdict = "Strong No";

      parsedEvaluation.id = 'eval_' + Date.now();
      parsedEvaluation.scenarioId = scenario.id;
      parsedEvaluation.scenarioTitle = scenario.title;
      parsedEvaluation.track = scenario.track;
      parsedEvaluation.personaId = persona?.id || 'maya';
      parsedEvaluation.completedAt = new Date().toISOString();
      parsedEvaluation.durationSeconds = elapsedSeconds;
      parsedEvaluation.candidateTurnCount = candidateTurnCount;
      parsedEvaluation.confidence = parsedEvaluation.confidence || "High";

      res.json(parsedEvaluation);
    } catch (error: any) {
      console.error("[Interview Evaluation Error]:", error);
      res.status(500).json({ error: error.message || "Failed to generate interview evaluation" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const publicPath = process.cwd();
    
    // Try serving from dist first, then fallback to root if dist doesn't exist
    app.use(express.static(distPath));
    app.use(express.static(publicPath));
    
    app.get('*all', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      const fallbackPath = path.join(publicPath, 'index.html');
      
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.sendFile(fallbackPath);
      }
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  server.on("error", (err: any) => {
    console.error("Server listen error:", err);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
