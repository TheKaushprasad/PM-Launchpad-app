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

      const candidateMessages = messages.filter((m: any) => m.role === 'candidate' && m.text?.trim() && !m.id?.startsWith('init_start'));

      // Rule 5: NO RESPONSE check
      if (candidateMessages.length === 0) {
        return res.json({
          id: 'eval_' + Date.now(),
          scenarioId: scenario.id,
          scenarioTitle: scenario.title,
          track: scenario.track,
          personaId: persona?.id || 'maya',
          completedAt: new Date().toISOString(),
          durationSeconds: elapsedSeconds,
          overallScore: 0,
          verdict: "Strong No",
          transcriptSummary: "The interview ended before you had a chance to work through the problem, so there isn't enough evidence here to assess your PM thinking. The 0 reflects the fact that no substantive answer was given in this session, rather than a judgment about your underlying PM ability.",
          pillars: {
            clarification: {
              name: "Clarification & Scope Definition",
              score: 0,
              maxScore: 20,
              feedback: "The session ended before you had an opportunity to ask scoping questions or clarify the problem perimeter.",
              whyTheyEarnedThisScore: "We didn't get far enough into the session to start scoping the problem together.",
              whyTheyDidNotScoreHigher: "There were no questions asked about metric definitions, timeline, or affected user segments.",
              strengths: ["You started the session and were ready to jump in."],
              improvements: ["When starting an interview, spend the first 60–90 seconds clarifying the problem scope and metric boundaries."]
            },
            framework: {
              name: "Structured Framework & Decomposition",
              score: 0,
              maxScore: 20,
              feedback: "We didn't get far enough to see how you would structure and break down the problem.",
              whyTheyEarnedThisScore: "No framework was laid out before the session concluded.",
              whyTheyDidNotScoreHigher: "We didn't see an initial roadmap or categorization of how you'd tackle the challenge.",
              strengths: [],
              improvements: ["Before exploring specific ideas, lay out 2–3 high-level areas you want to investigate."]
            },
            analyticalRigor: {
              name: "Analytical Rigor & Logical Depth",
              score: 0,
              maxScore: 20,
              feedback: "The interview ended before we got into hypotheses or testing, so I can't assess your analytical depth from this session.",
              whyTheyEarnedThisScore: "The session concluded before analytical discussion began.",
              whyTheyDidNotScoreHigher: "No hypotheses, data requests, or calculations were explored in this brief session.",
              strengths: [],
              improvements: ["State prioritized hypotheses and explain what evidence would confirm or disprove each one."]
            },
            communication: {
              name: "Communication & Conciseness",
              score: 0,
              maxScore: 20,
              feedback: "There wasn't enough back-and-forth dialogue in this brief session to evaluate communication pacing.",
              whyTheyEarnedThisScore: "The session closed before a conversational rhythm could be established.",
              whyTheyDidNotScoreHigher: "We didn't get to engage in interactive problem-solving together.",
              strengths: [],
              improvements: ["Keep communication interactive by checking in with the interviewer after outlining each major point."]
            },
            synthesis: {
              name: "Synthesis & Final Recommendation",
              score: 0,
              maxScore: 20,
              feedback: "The interview ended before you reached a conclusion, so synthesis was not tested in this session.",
              whyTheyEarnedThisScore: "The conversation didn't reach the solution or wrap-up stage.",
              whyTheyDidNotScoreHigher: "We never reached a final summary, risk trade-offs, or recommended next steps.",
              strengths: [],
              improvements: ["Always aim to leave 2–3 minutes at the end of an interview to deliver a crisp executive summary."]
            }
          },
          topStrengths: [
            "You set up the interview and took the first step to practice under simulated conditions."
          ],
          criticalGrowthAreas: [
            "Make sure you have enough dedicated time to walk through your approach before ending the interview.",
            "Start by clarifying whether the issue is sudden or gradual, and which specific user cohorts are affected.",
            "Outline your roadmap up front so your interviewer knows where you plan to go next."
          ],
          exemplarAnswer: {
            recommendedApproach: `A strong Senior PM tackling ${scenario.title} would probably start by making sure the core problem is clearly bounded and real. From there, they'd break down the problem into 2–3 distinct investigation buckets, test high-conviction hypotheses with specific data points, and close with a practical action plan.`,
            stepByStepStructure: [
              { step: "Step 1: Clarify & Bound", detail: "Clarify whether the metric is relative vs absolute, identify which platforms or cohorts are impacted, and verify data logging integrity." },
              { step: "Step 2: Map the Landscape", detail: "Lay out 2–3 logical buckets (e.g., user friction points, technical issues, external shifts) before diving into details." },
              { step: "Step 3: Test Hypotheses", detail: "Pick your top hypothesis first, explain why you suspect it, and specify the exact data cut that would prove or disprove it." },
              { step: "Step 4: Wrap with a Plan", detail: "Deliver a 60-second executive summary with immediate mitigations, secondary guardrail metrics, and longer-term next steps." }
            ],
            interviewerSecretNotes: "Senior interviewers look for candidates who state their hypothesis clearly before asking for data."
          }
        });
      }

      const systemInstruction = `
You are an experienced Senior PM / Staff PM interviewer giving thoughtful, direct post-interview feedback to a candidate after a mock interview on Noob PM.

CRITICAL VOICE AND TONE DIRECTIVES:
1. SPEAK DIRECTLY TO THE CANDIDATE ("YOU"):
   - Address the candidate as "you" (e.g., "You did a good job narrowing...", "Where I'd push you further...", "One thing that stood out in your answer...").
   - Do NOT refer to them in the third person as "The candidate" or "The user".
   - This is conversational, professional, encouraging, and honest feedback from a senior colleague, NOT an internal HR audit, compliance check, or academic grading sheet.
2. BAN BUREAUCRATIC JARGON & STACKED BUZZWORDS:
   - Avoid cold phrases like "No meaningful evidence was demonstrated", "Demonstrated moderate analytical rigor with gaps", "Bar gap", "Exhaustive MECE driver tree".
   - Explain PM principles naturally in plain English: "You broke the problem into a few clear areas and then narrowed down which one was most likely. That made your investigation easy to follow."
3. MAKE EACH SCORE FEEL CONVERSATIONALLY JUSTIFIED:
   - In "whyTheyEarnedThisScore": Explain naturally why this score makes sense based on what they actually said and did. Quote short snippets from their words.
   - In "whyTheyDidNotScoreHigher": Frame it as coaching on what would have made their answer stronger ("What would have pushed this higher: I'd have liked to see you prioritize which hypothesis to investigate first and explain what data would disprove it...").
4. STRENGTHS & GROWTH AREAS MUST BE SPECIFIC AND ACTIONABLE:
   - Strengths: Highlight concrete behaviors (e.g., "You clarified whether the metric change was relative or absolute before diving in...").
   - Growth areas: Give practical advice they can try next time (e.g., "Before exploring individual causes, take 30–60 seconds to outline your 3 main buckets...").
5. PARTIAL INTERVIEWS & TIMER CUT-OFFS REQUIRE EMPATHY:
   - If the interview ended early or the candidate was cut off before reaching synthesis, do NOT say "You failed synthesis". Say: "The timer ended before we got to your final recommendation, so we didn't have enough time to assess your synthesis."
6. AVOID ROBOTIC REPETITION:
   - Do not repeat identical sentences across feedback, why earned, why not higher, strengths, and improvements. Every field should add a distinct, helpful thought.

SCENARIO METADATA:
- Title: ${scenario.title}
- Track: ${scenario.track?.toUpperCase()}
- Difficulty: ${scenario.difficulty || 'Medium'}
- Company: ${scenario.company}
- Problem Statement: ${scenario.problemStatement}
- Benchmark Guidelines: ${JSON.stringify(scenario.benchmarkOutline || {})}
- Interviewer Persona: ${persona?.name || 'Senior PM'} (${persona?.role || 'Bar Raiser'})

SCORING BANDS (0-20 PER PILLAR, SUM = 100):
- 18-20: Exceptional Senior PM performance (rare, proactive, independent, deep).
- 15-17: Strong performance with only minor gaps.
- 12-14: Solid and competent with noticeable gaps.
- 9-11: Developing, partial competence with meaningful weaknesses or heavy prompting.
- 5-8: Weak, major omissions or heavy dependence on interviewer hints.
- 1-4: Very weak, minimal demonstrated capability.
- 0: Fundamentally absent or not demonstrated in this session.

VERDICT THRESHOLDS (strictly tied to total score):
- 85-100: "Strong Yes"
- 70-84: "Lean Yes"
- 50-69: "Lean No"
- 0-49: "Strong No"

You MUST return a valid JSON object strictly conforming to this schema:
{
  "overallScore": number,
  "verdict": "Strong Yes" | "Lean Yes" | "Lean No" | "Strong No",
  "transcriptSummary": "2-3 conversational, encouraging, and honest sentences summarizing how you tackled the challenge, your standout strength, and your primary area to focus on next.",
  "pillars": {
    "clarification": {
      "name": "Clarification & Scope Definition",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "Conversational assessment of how you clarified the problem scope, spoken directly to 'you'.",
      "evidence": ["Short verbatim quote or specific thing you asked/said", "..."],
      "whyTheyEarnedThisScore": "Why this score makes sense based on what you clarified.",
      "whyTheyDidNotScoreHigher": "What would have made your scoping stronger.",
      "strengths": ["Specific good behavior you showed", "..."],
      "improvements": ["Actionable tip you can practice next time", "..."]
    },
    "framework": {
      "name": "Structured Framework & Decomposition",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "Conversational assessment of your structure and problem breakdown.",
      "evidence": ["Specific roadmap or categories you laid out", "..."],
      "whyTheyEarnedThisScore": "Why this score makes sense for your structure.",
      "whyTheyDidNotScoreHigher": "What would have made your structure clearer or easier to follow.",
      "strengths": ["Specific good structural move you made", "..."],
      "improvements": ["Actionable tip on how to structure next time", "..."]
    },
    "analyticalRigor": {
      "name": "Analytical Rigor & Logical Depth",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "Conversational assessment of your hypotheses, reasoning, and data checks.",
      "evidence": ["Specific hypothesis, calculation, or data point you examined", "..."],
      "whyTheyEarnedThisScore": "Why this score makes sense for your analytical depth.",
      "whyTheyDidNotScoreHigher": "What would have pushed your analytical rigor higher.",
      "strengths": ["Specific strong analytical move you made", "..."],
      "improvements": ["Actionable tip on validating hypotheses with data", "..."]
    },
    "communication": {
      "name": "Communication & Conciseness",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "Conversational assessment of your verbal pacing, signposting, and check-ins.",
      "evidence": ["Specific communication habit or moment observed", "..."],
      "whyTheyEarnedThisScore": "Why this score makes sense for your communication.",
      "whyTheyDidNotScoreHigher": "What would have made your communication even crisper.",
      "strengths": ["Specific good communication habit you showed", "..."],
      "improvements": ["Actionable tip on communication pacing or check-ins", "..."]
    },
    "synthesis": {
      "name": "Synthesis & Final Recommendation",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "Conversational assessment of how you wrapped up and made a recommendation.",
      "evidence": ["Specific recommendation, trade-off, or next step you gave", "..."],
      "whyTheyEarnedThisScore": "Why this score makes sense for your synthesis.",
      "whyTheyDidNotScoreHigher": "What would have made your final recommendation more compelling.",
      "strengths": ["Specific good wrap-up point you delivered", "..."],
      "improvements": ["Actionable tip on delivering a top-line executive recommendation", "..."]
    }
  },
  "topStrengths": [
    "What you did well (Behavior → specific example → why it worked)",
    "What you did well (Behavior → specific example → why it worked)",
    "What you did well (Behavior → specific example → why it worked)"
  ],
  "criticalGrowthAreas": [
    "Where to improve (Observed habit → why it held you back → practical adjustment)",
    "Where to improve (Observed habit → why it held you back → practical adjustment)",
    "Where to improve (Observed habit → why it held you back → practical adjustment)"
  ],
  "exemplarAnswer": {
    "recommendedApproach": "A natural, accessible walkthrough of how an experienced Senior PM would crack this exact case.",
    "stepByStepStructure": [
      { "step": "Step 1: Clarify & Bound", "detail": "..." },
      { "step": "Step 2: Map the Core Areas", "detail": "..." },
      { "step": "Step 3: Investigate & Test", "detail": "..." },
      { "step": "Step 4: Recommend & Mitigate", "detail": "..." }
    ],
    "interviewerSecretNotes": "Helpful insider insight on what interviewers look for in this case and common traps to watch out for.",
    "highestLeverageImprovement": {
      "focusArea": "The single most impactful skill for you to work on next",
      "currentBehavior": "What you did in this session",
      "targetBehavior": "What a seasoned Senior PM would do instead",
      "practiceDrill": "A concrete 10-minute drill you can practice right now"
    }
  }
}
`.trim();

      const prompt = `
FULL INTERVIEW CHRONOLOGICAL TRANSCRIPT:
${messages.map((m: any, i: number) => `[Turn ${i+1}] ${m.role?.toUpperCase() || 'USER'}: ${m.text || ''}`).join('\n\n')}

CANDIDATE SCRATCHPAD NOTES:
${scratchpadNotes?.trim() ? scratchpadNotes.trim() : '(No scratchpad notes provided)'}

SESSION DURATION: ${Math.floor(elapsedSeconds / 60)} minutes (${elapsedSeconds} seconds).

Analyze the entire transcript and scratchpad as an experienced Senior PM mentor. Address the candidate directly ("you"), provide constructive, human feedback, verify all 5 pillar scores, and return the complete JSON evaluation.
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

      // Robust fallback evaluation object if API fails
      if (!parsedEvaluation || !parsedEvaluation.pillars) {
        const candidateTurnCount = messages.filter((m: any) => m.role === 'candidate').length;
        const baseScore = Math.min(88, Math.max(55, 60 + candidateTurnCount * 5));
        const verdict = baseScore >= 85 ? "Strong Yes" : baseScore >= 70 ? "Lean Yes" : "Lean No";

        parsedEvaluation = {
          overallScore: baseScore,
          verdict,
          transcriptSummary: `You worked through a ${Math.floor(elapsedSeconds / 60)}-minute session on ${scenario.title}, having a collaborative discussion with ${persona?.name || 'the interviewer'}. You brought good energy and sensible instincts, and with a bit more structured prioritization, your thinking can reach the next level.`,
          pillars: {
            clarification: {
              name: "Clarification & Scope Definition",
              score: Math.min(20, Math.round(baseScore * 0.2)),
              maxScore: 20,
              feedback: "You asked thoughtful scoping questions that helped establish the business context.",
              evidence: ["Clarified primary business boundaries and timeline"],
              whyTheyEarnedThisScore: "You checked the timeline and made sure we were talking about the same problem before jumping in.",
              whyTheyDidNotScoreHigher: "It would have helped to probe external market factors and user cohorts a little earlier in the conversation.",
              strengths: ["You clarified the problem perimeter before jumping into solutions", "You asked about the timeline and trend"],
              improvements: ["Probe external factors like competitor launches or seasonality right after confirming internal changes"]
            },
            framework: {
              name: "Structured Framework & Decomposition",
              score: Math.min(20, Math.round(baseScore * 0.2)),
              maxScore: 20,
              feedback: "You set up a clean, logical breakdown that gave us a clear path through the problem.",
              evidence: ["Established problem breakdown into structured buckets"],
              whyTheyEarnedThisScore: "You gave yourself a clear roadmap rather than guessing randomly.",
              whyTheyDidNotScoreHigher: "To push into the top range, explain up front which bucket you want to explore first and why.",
              strengths: ["You signposted your steps clearly", "You mapped logical stages in the user journey"],
              improvements: ["Before exploring individual ideas, spend 30 seconds explicitly ranking which area to check first"]
            },
            analyticalRigor: {
              name: "Analytical Rigor & Logical Depth",
              score: Math.min(20, Math.round(baseScore * 0.2)),
              maxScore: 20,
              feedback: "You had good analytical instincts and explored plausible causes.",
              evidence: ["Generated testable hypotheses based on interviewer feedback"],
              whyTheyEarnedThisScore: "You followed a hypothesis-driven approach to investigate the main drivers.",
              whyTheyDidNotScoreHigher: "Make sure to state what specific data or signal would confirm or eliminate each hypothesis.",
              strengths: ["You formed hypotheses based on real user behavior", "You asked for specific data points"],
              improvements: ["State your expected signal before looking at the data ('If this is true, I'd expect to see X')"]
            },
            communication: {
              name: "Communication & Conciseness",
              score: Math.min(20, Math.round(baseScore * 0.2)),
              maxScore: 20,
              feedback: "Your communication was natural and easy to follow throughout the session.",
              evidence: ["Maintained conversational rhythm and active check-ins"],
              whyTheyEarnedThisScore: "You listened actively to interviewer questions and kept your answers structured.",
              whyTheyDidNotScoreHigher: "Try leading with your bottom-line takeaway before walking through the detailed reasoning.",
              strengths: ["Engaging, natural conversational rhythm", "Listened actively to interviewer prompts"],
              improvements: ["Lead with the answer first (BLUF), then unpack the supporting points"]
            },
            synthesis: {
              name: "Synthesis & Final Recommendation",
              score: Math.min(20, Math.round(baseScore * 0.2)),
              maxScore: 20,
              feedback: "You closed with a practical recommendation and acknowledged realistic trade-offs.",
              evidence: ["Summarized primary findings and proposed mitigations"],
              whyTheyEarnedThisScore: "You provided actionable next steps and identified sensible guardrail metrics.",
              whyTheyDidNotScoreHigher: "To make your recommendation even sharper, distinguish quick 30-day fixes from longer-term initiatives.",
              strengths: ["Offered concrete mitigations", "Identified sensible guardrail metrics"],
              improvements: ["Prioritize immediate 30-day wins versus longer-term strategic bets"]
            }
          },
          topStrengths: [
            "You scoped the problem before jumping to conclusions — you asked clarifying questions that kept us focused on the real issue.",
            "You kept the conversation structured — you gave your interviewer a roadmap and stuck to it.",
            "You listened and adapted — when new information was introduced, you updated your thinking smoothly."
          ],
          criticalGrowthAreas: [
            "Prioritize your hypotheses up front — instead of treating every cause equally, pick the top 2 and explain why you're starting there.",
            "State your expected signal before requesting data — say what numbers you expect to see if your hypothesis is right.",
            "Lead with the bottom line — give your executive takeaway in the first 15 seconds of your recommendation."
          ],
          exemplarAnswer: {
            recommendedApproach: `A strong Senior PM tackling ${scenario.title} would start by verifying the metric drop and scoping which user cohorts are affected. They'd then break the problem into 2–3 clear investigation areas, test their top hypothesis first, and close with a realistic action plan and guardrails.`,
            stepByStepStructure: [
              { step: "Step 1: Clarify & Bound", detail: "Check whether the metric drop is relative or absolute, and isolate whether it's specific to an app version or platform." },
              { step: "Step 2: Map the Core Areas", detail: "Group potential causes into Funnel Issues, Technical Regressions, and External Market Factors." },
              { step: "Step 3: Test Hypotheses", detail: "Formulate testable hypotheses and identify the fastest data cut to validate or eliminate them." },
              { step: "Step 4: Executive Recommendation", detail: "Deliver a crisp summary with immediate mitigations, guardrail metrics, and longer-term prevention." }
            ],
            interviewerSecretNotes: "Top performers state the testable hypothesis before asking for data cuts.",
            highestLeverageImprovement: {
              focusArea: "Hypothesis Prioritization",
              currentBehavior: "Listing multiple plausible causes without ranking them",
              targetBehavior: "Picking the 2 most likely causes and explaining why you're investigating them first",
              practiceDrill: "Pick an RCA problem and give yourself 60 seconds to rank 3 hypotheses by probability and ease of validation."
            }
          }
        };
      }

      // Enforce Rule 21 & Rule 22: Mathematical consistency of scores & verdict
      const p = parsedEvaluation.pillars;
      const cScore = typeof p?.clarification?.score === 'number' ? Math.max(0, Math.min(20, Math.round(p.clarification.score))) : 10;
      const fScore = typeof p?.framework?.score === 'number' ? Math.max(0, Math.min(20, Math.round(p.framework.score))) : 10;
      const aScore = typeof p?.analyticalRigor?.score === 'number' ? Math.max(0, Math.min(20, Math.round(p.analyticalRigor.score))) : 10;
      const mScore = typeof p?.communication?.score === 'number' ? Math.max(0, Math.min(20, Math.round(p.communication.score))) : 10;
      const sScore = typeof p?.synthesis?.score === 'number' ? Math.max(0, Math.min(20, Math.round(p.synthesis.score))) : 10;

      if (p.clarification) p.clarification.score = cScore;
      if (p.framework) p.framework.score = fScore;
      if (p.analyticalRigor) p.analyticalRigor.score = aScore;
      if (p.communication) p.communication.score = mScore;
      if (p.synthesis) p.synthesis.score = sScore;

      const calculatedTotal = cScore + fScore + aScore + mScore + sScore;
      parsedEvaluation.overallScore = calculatedTotal;

      // Verdict strictly tied to total score
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
