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

  // API Route for LinkedIn Audit
  app.post(["/api/audit-linkedin", "/api/audit-linkedin/"], async (req, res) => {
    console.log(`[${new Date().toISOString()}] POST ${req.path} - Request received`);
    try {
      const { profileData, targetRoles, systemInstruction } = req.body;
      
      if (!profileData || !targetRoles) {
        console.warn(`[${new Date().toISOString()}] POST ${req.path} - Missing fields`);
        return res.status(400).json({ error: "Missing required fields" });
      }

      console.log(`[${new Date().toISOString()}] POST ${req.path} - Calling OpenAI...`);
      const openai = getOpenAI();
      const rolesStr = targetRoles.join(', ');
      
      const prompt = `User is targeting these roles: ${rolesStr}. Audit this profile text for overall alignment and shortlisting probability:\n\n${profileData}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemInstruction.replace('[TARGET_ROLES_PLACEHOLDER]', rolesStr) },
          { role: "user", content: prompt }
        ],
        temperature: 0,
      });

      const result = completion.choices[0].message.content;
      console.log(`[${new Date().toISOString()}] POST ${req.path} - Success`);
      res.json({ text: result });
    } catch (error: any) {
      console.error(`[${new Date().toISOString()}] POST ${req.path} - Error:`, error);
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
    const publicPath = process.cwd();
    
    // Try serving from dist first, then fallback to root if dist doesn't exist
    app.use(express.static(distPath));
    app.use(express.static(publicPath));
    
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      const fallbackPath = path.join(publicPath, 'index.html');
      
      if (require('fs').existsSync(indexPath)) {
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
