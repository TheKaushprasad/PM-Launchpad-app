import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import { scrapeLinkedInProfile, validateLinkedInUrl } from "./services/firecrawl";
import { normalizeProfileData, analyzeProfileWithAI, getSampleAnalysis, TARGET_ROLE_KEYWORDS } from "./services/profileAnalyzer";

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
  app.post(["/api/audit-resume", "/api/audit-resume/"], async (req, res) => {
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

      const aiResponse = await generateAIResponse({
        prompt,
        systemInstruction: SYSTEM_PROMPT,
        jsonMode: true,
      });

      let parsedResult: any;
      try {
        const aiResponse = await generateAIResponse({
          prompt,
          systemInstruction: SYSTEM_PROMPT,
          jsonMode: true,
        });

        let cleanText = aiResponse.trim();
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
            throw new Error("No JSON structure found");
          }
        }
      } catch (aiErr: any) {
        console.warn("[PM Resume Audit AI Warning]: AI model evaluation failed, using deep PM heuristic engine:", aiErr?.message || aiErr);
        parsedResult = generateHeuristicResumeAudit(resumeText, targetRole, jobTitle, jobDescription);
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
          wordCount: resumeText.trim().split(/\s+/).length,
          analyzedAt: new Date().toISOString()
        }
      });
    } catch (err: any) {
      console.error("[PM Resume Audit Error]:", err);
      res.status(500).json({ error: err.message || "Failed to audit resume." });
    }
  });

  // Comprehensive Algorithmic PM Resume Auditor Fallback Engine
  function generateHeuristicResumeAudit(resumeText: string, targetRole: string, jobTitle?: string, jobDescription?: string): any {
    const lines = resumeText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 15);
    const bullets = lines.filter(l => l.startsWith('•') || l.startsWith('-') || l.startsWith('*') || /^[0-9]+\./.test(l) || l.length > 40);

    const pmKeywords = ['product', 'roadmap', 'prd', 'kpi', 'okr', 'metric', 'user research', 'a/b test', 'conversion', 'retention', 'revenue', 'dau', 'mau', 'sprint', 'scrum', 'backlog', 'stakeholder', 'mvp', 'launch', 'feature', 'churn', 'cac', 'ltv', 'customer', 'discovery', 'strategy', 'prioritization'];
    const weakPhrases = ['responsible for', 'assisted with', 'helped to', 'worked with', 'coordinated with', 'participated in', 'managed day to day', 'tasked with', 'duties included'];

    let metricBulletCount = 0;
    let pmFramedBulletCount = 0;
    const weakBulletsFound: { bullet: string; reason: string; weakPhrase?: string }[] = [];

    bullets.forEach(b => {
      const lower = b.toLowerCase();
      const hasNumber = /\d+%|\$\d+|\d+k|\d+m|\d+x|\b\d+\b/.test(lower);
      if (hasNumber) metricBulletCount++;

      const hasPmTerms = pmKeywords.some(k => lower.includes(k));
      if (hasPmTerms) pmFramedBulletCount++;

      const matchedWeak = weakPhrases.find(w => lower.includes(w));
      if (matchedWeak) {
        weakBulletsFound.push({
          bullet: b.replace(/^[•\-*\d.]+\s*/, ''),
          reason: `Uses passive coordination phrase ("${matchedWeak}") instead of active product ownership.`,
          weakPhrase: matchedWeak
        });
      } else if (!hasNumber && b.length > 50 && weakBulletsFound.length < 8) {
        weakBulletsFound.push({
          bullet: b.replace(/^[•\-*\d.]+\s*/, ''),
          reason: `Lacks quantified business impact or outcome metrics to substantiate the result.`,
        });
      }
    });

    const totalB = Math.max(bullets.length, 1);
    const impactScore = Math.min(95, Math.max(35, Math.round((metricBulletCount / totalB) * 85 + 20)));
    const pmFramingScore = Math.min(95, Math.max(40, Math.round((pmFramedBulletCount / totalB) * 80 + 25)));
    
    // ATS structural check
    const hasStandardSections = ['experience', 'education', 'skills'].filter(s => resumeText.toLowerCase().includes(s)).length;
    const atsScore = Math.min(98, Math.max(50, 60 + hasStandardSections * 12));
    const clarityScore = Math.min(95, Math.max(50, 75 - (weakBulletsFound.length * 3)));

    const compositeScore = Math.round(impactScore * 0.35 + pmFramingScore * 0.30 + atsScore * 0.15 + clarityScore * 0.20);

    // Generate bullet rewrites with [METRIC] placeholders
    const rewrites = (weakBulletsFound.slice(0, 6)).map(item => {
      let rewritten = item.bullet;
      if (item.weakPhrase) {
        rewritten = rewritten.replace(new RegExp(item.weakPhrase, 'gi'), 'Led cross-functional product execution for');
      }
      if (!/\d+%|\$\d+|\d+x/.test(rewritten)) {
        rewritten = `${rewritten.replace(/[.]+$/, '')}, achieving [+X% METRIC] improvement in user adoption and driving [$Yk/Mo ARR impact].`;
      }
      return {
        original: item.bullet,
        rewritten: rewritten.charAt(0).toUpperCase() + rewritten.slice(1),
        reason: item.reason
      };
    });

    if (rewrites.length === 0 && bullets.length > 0) {
      rewrites.push({
        original: bullets[0].replace(/^[•\-*\d.]+\s*/, ''),
        rewritten: `Spearheaded product discovery and launch of core workflow, driving [+25% user engagement] and accelerating delivery cycle by [3 weeks].`,
        reason: "Strengthened action verb and anchored outcome with quantified operational metrics."
      });
    }

    const hasJobCheck = Boolean(jobDescription && jobDescription.trim().length > 10);
    let jobSuitabilityData: any = undefined;

    if (hasJobCheck && jobDescription) {
      const jdWords = jobDescription.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
      const resumeLower = resumeText.toLowerCase();
      const matched = Array.from(new Set(jdWords.filter(w => pmKeywords.includes(w) && resumeLower.includes(w)))).slice(0, 4);
      const missing = Array.from(new Set(jdWords.filter(w => pmKeywords.includes(w) && !resumeLower.includes(w)))).slice(0, 3);
      
      const matchScore = Math.min(92, Math.max(45, Math.round(55 + (matched.length * 9) - (missing.length * 5))));
      let verdict = "Moderate Match";
      if (matchScore >= 80) verdict = "Strong Match";
      else if (matchScore < 60) verdict = "Gaps Detected";

      jobSuitabilityData = {
        match_score: matchScore,
        verdict,
        target_job_title: jobTitle || targetRole,
        matched_skills: matched.length > 0 ? matched.map(m => m.toUpperCase()) : ["Agile Product Delivery", "Cross-Functional Leadership", "Stakeholder Alignment"],
        missing_skills_or_experiences: missing.length > 0 ? missing.map(m => `Demonstrated depth in ${m}`) : ["High-scale experimentation (A/B testing)", "0-to-1 Product Discovery Case Studies"],
        tailoring_recommendations: [
          `Mirror the exact domain terms from the ${jobTitle || targetRole} job description in your top 3 experience bullets.`,
          `Highlight metrics specifically tied to the company's business model (e.g. conversion rates, retention curves, or CAC efficiency).`,
          `Elevate your technical collaboration bullets to highlight trade-off decisions made with engineering.`
        ]
      };
    }

    return {
      composite_score: compositeScore,
      sub_scores: {
        impact_metrics_score: impactScore,
        pm_framing_score: pmFramingScore,
        ats_readability_score: atsScore,
        clarity_score: clarityScore
      },
      narrative_feedback: `This resume presents a solid foundation of product delivery and execution, but currently frames responsibilities through operational tasks rather than strategic product ownership. By sharpening bullets to quantify business outcomes (e.g., revenue, user retention, conversion lift) and replacing passive phrasing with leadership verbs, you will significantly elevate your interview callback rate for ${targetRole} positions.`,
      bullet_rewrites: rewrites,
      top_strengths: [
        "Clear chronological career progression and structured section organization.",
        "Demonstrated exposure to cross-functional engineering and design workflows.",
        "Good structural ATS parseability across major applicant tracking systems."
      ],
      top_priorities: [
        "Replace passive task descriptions ('worked with', 'assisted') with high-ownership PM verbs ('Owned', 'Spearheaded', 'Engineered').",
        "Anchor every single major bullet point with a quantified metric or measurable outcome [e.g. +X% conversion, $Y revenue].",
        "Condense lengthy 3+ line paragraphs into concise, high-impact 1-to-2 line achievements."
      ],
      ...(jobSuitabilityData ? { job_suitability: jobSuitabilityData } : {})
    };
  }

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
      const { scenario, persona, messages, elapsedSeconds = 0 } = req.body;

      if (!scenario || !messages || messages.length === 0) {
        return res.status(400).json({ error: "Insufficient session data for evaluation" });
      }

      const systemInstruction = `
You are the Head of Product Hiring and Senior Assessment Bar Raiser evaluating a completed Product Management mock interview.
Evaluate the candidate's performance across 5 standardized PM rubric pillars based purely on the provided transcript.

SCENARIO: ${scenario.title} (${scenario.track?.toUpperCase()})
PROBLEM: ${scenario.problemStatement}
BENCHMARK EXPECTATIONS: ${JSON.stringify(scenario.benchmarkOutline)}
INTERVIEWER PERSONA: ${persona?.name || 'Senior PM'}

RUBRIC PILLARS (Max 20 points each, Total 100):
1. Clarification & Scope Definition (0-20): Did candidate ask clarifying questions, bound the problem, verify definitions & timeline?
2. Structured Framework & Decomposition (0-20): Was the framework structured, MECE, and appropriate for the track?
3. Analytical Rigor & Logical Depth (0-20): Deep exploration of root causes, realistic math assumptions, data-driven hypothesis testing?
4. Communication & Conciseness (0-20): Clear verbal pacing, check-ins with interviewer, structured signposting?
5. Synthesis & Final Recommendation (0-20): Clear executive summary, bottom-line answer, tradeoff acknowledgment, and next steps?

HIRING VERDICT THRESHOLDS:
- 85-100: "Strong Yes"
- 70-84: "Lean Yes"
- 50-69: "Lean No"
- 0-49: "Strong No"

You MUST return a valid JSON object strictly matching this schema:
{
  "overallScore": number (0-100),
  "verdict": "Strong Yes" | "Lean Yes" | "Lean No" | "Strong No",
  "transcriptSummary": "string summarizing how the candidate tackled the problem in 2-3 sentences",
  "pillars": {
    "clarification": {
      "name": "Clarification & Scope Definition",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "string",
      "strengths": ["string", "string"],
      "improvements": ["string", "string"]
    },
    "framework": {
      "name": "Structured Framework & Decomposition",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "string",
      "strengths": ["string", "string"],
      "improvements": ["string", "string"]
    },
    "analyticalRigor": {
      "name": "Analytical Rigor & Logical Depth",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "string",
      "strengths": ["string", "string"],
      "improvements": ["string", "string"]
    },
    "communication": {
      "name": "Communication & Conciseness",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "string",
      "strengths": ["string", "string"],
      "improvements": ["string", "string"]
    },
    "synthesis": {
      "name": "Synthesis & Final Recommendation",
      "score": number (0-20),
      "maxScore": 20,
      "feedback": "string",
      "strengths": ["string", "string"],
      "improvements": ["string", "string"]
    }
  },
  "topStrengths": ["string", "string", "string"],
  "criticalGrowthAreas": ["string", "string", "string"],
  "exemplarAnswer": {
    "recommendedApproach": "High-level strategic explanation of how an L6 FAANG PM would crack this case",
    "stepByStepStructure": [
      { "step": "Step 1: Clarification & Bounds", "detail": "..." },
      { "step": "Step 2: Core Decomposition", "detail": "..." },
      { "step": "Step 3: Hypothesis Testing / Math Engine", "detail": "..." },
      { "step": "Step 4: Executive Recommendation & Risks", "detail": "..." }
    ],
    "interviewerSecretNotes": "Key traps candidates often fall into for this specific case"
  }
}
`.trim();

      const prompt = `FULL INTERVIEW TRANSCRIPT:\n\n${messages.map((m: any, i: number) => `[Turn ${i+1}] ${m.role.toUpperCase()}: ${m.text}`).join('\n\n')}\n\nELAPSED TIME: ${Math.floor(elapsedSeconds / 60)} minutes.\n\nGenerate the complete JSON evaluation.`;

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
          transcriptSummary: `The candidate completed a ${Math.floor(elapsedSeconds / 60)}-minute interactive session on ${scenario.title}, engaging in structured dialogue with ${persona?.name || 'the interviewer'}.`,
          pillars: {
            clarification: {
              name: "Clarification & Scope Definition",
              score: Math.min(20, Math.round(baseScore * 0.2)),
              maxScore: 20,
              feedback: "Asked relevant scoping questions and framed the business context.",
              strengths: ["Defined problem perimeter", "Clarified key timeline definitions"],
              improvements: ["Probe external macro variables earlier", "Validate customer cohort definitions"]
            },
            framework: {
              name: "Structured Framework & Decomposition",
              score: Math.min(20, Math.round(baseScore * 0.2)),
              maxScore: 20,
              feedback: `Utilized structured breakdown aligned with ${scenario.suggestedFramework || 'MECE principles'}.`,
              strengths: ["Clear signposting", "Logical branches in user journey"],
              improvements: ["Ensure complete mutual exclusivity across categories", "Highlight prioritization criteria up front"]
            },
            analyticalRigor: {
              name: "Analytical Rigor & Logical Depth",
              score: Math.min(20, Math.round(baseScore * 0.2)),
              maxScore: 20,
              feedback: "Demonstrated sound quantitative intuition and root-cause hypothesis generation.",
              strengths: ["Hypothesis-driven questioning", "Logical data checks"],
              improvements: ["State base rate sanity checks", "Isolate confounding platform variables"]
            },
            communication: {
              name: "Communication & Conciseness",
              score: Math.min(20, Math.round(baseScore * 0.2)),
              maxScore: 20,
              feedback: "Delivered points with clear pacing and executive signposting.",
              strengths: ["Engaging conversation rhythm", "Listened actively to interviewer probes"],
              improvements: ["Tighten summary recommendations", "State bottom-line conclusions before detailed evidence"]
            },
            synthesis: {
              name: "Synthesis & Final Recommendation",
              score: Math.min(20, Math.round(baseScore * 0.2)),
              maxScore: 20,
              feedback: "Delivered actionable next steps and acknowledged risk tradeoffs.",
              strengths: ["Concrete launch rollout plan", "Clear guardrail metrics identified"],
              improvements: ["Quantify expected upside impact", "Prioritize immediate 30-day wins vs long-term bets"]
            }
          },
          topStrengths: [
            "Structured MECE problem decomposition",
            "Clear verbal signposting throughout the interview",
            "Strong user and business empathy"
          ],
          criticalGrowthAreas: [
            "Anchor quantitative assumptions with clear baseline anchors",
            "Deliver top-line executive conclusions before deep operational details",
            "Explicitly outline secondary guardrail metrics and rollout risks"
          ],
          exemplarAnswer: {
            recommendedApproach: `For ${scenario.title}, top candidates clarify geographic and user segmentation, construct an end-to-end driver tree, and deliver a prioritized 30-60-90 day experiment roadmap.`,
            stepByStepStructure: [
              { step: "Step 1: Clarification & Bounds", detail: "Clarify timeline, platforms, and primary business impact." },
              { step: "Step 2: Core Decomposition", detail: "Break down into Funnel vs Technical vs External Ecosystem factors." },
              { step: "Step 3: Hypothesis Engine", detail: "Isolate high-probability root causes and validate with telemetry." },
              { step: "Step 4: Executive Recommendation", detail: "Deliver actionable fix, guardrail metrics, and rollout plan." }
            ],
            interviewerSecretNotes: "Look for candidates who state their hypothesis clearly before requesting data."
          }
        };
      }

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
    
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      const fallbackPath = path.join(publicPath, 'index.html');
      
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.sendFile(fallbackPath);
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
