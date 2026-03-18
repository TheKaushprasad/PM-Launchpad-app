import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  // OpenAI Client Initialization
  const getOpenAI = () => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is required");
    }
    return new OpenAI({ apiKey });
  };

  // API Route for LinkedIn Audit
  app.post("/api/audit-linkedin", async (req, res) => {
    try {
      const { profileData, targetRoles, systemInstruction } = req.body;
      
      if (!profileData || !targetRoles) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const openai = getOpenAI();
      const rolesStr = targetRoles.join(', ');
      
      const prompt = `User is targeting these roles: ${rolesStr}. Audit this profile text for overall alignment and shortlisting probability:\n\n${profileData}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // Using gpt-4o for high-quality analysis
        messages: [
          { role: "system", content: systemInstruction.replace('[TARGET_ROLES_PLACEHOLDER]', rolesStr) },
          { role: "user", content: prompt }
        ],
        temperature: 0, // Deterministic output
      });

      const result = completion.choices[0].message.content;
      res.json({ text: result });
    } catch (error: any) {
      console.error("OpenAI API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate audit" });
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
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
