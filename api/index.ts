import type { VercelRequest, VercelResponse } from "@vercel/node";
import path from "path";
import fs from "fs";

let cachedApp: any = null;

async function getExpressApp() {
  if (cachedApp) return cachedApp;

  // 1. Try pre-bundled production CommonJS artifact (in api/ directory or dist/)
  const distServerPaths = [
    path.join(__dirname, "_server.cjs"),
    path.join(process.cwd(), "api", "_server.cjs"),
    path.join(process.cwd(), "dist", "server.cjs"),
    path.join(__dirname, "..", "dist", "server.cjs"),
    path.join(__dirname, "dist", "server.cjs")
  ];

  for (const p of distServerPaths) {
    if (fs.existsSync(p)) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const serverModule = require(p);
        if (serverModule && typeof serverModule.createExpressApp === "function") {
          cachedApp = await serverModule.createExpressApp();
          return cachedApp;
        }
      } catch (err) {
        console.warn(`[Vercel Serverless] Failed loading from ${p}:`, err);
      }
    }
  }

  // 2. Direct TypeScript import fallback
  try {
    const { createExpressApp } = await import("../server.js");
    cachedApp = await createExpressApp();
    return cachedApp;
  } catch {
    const { createExpressApp } = await import("../server");
    cachedApp = await createExpressApp();
    return cachedApp;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = await getExpressApp();
    return app(req, res);
  } catch (err: any) {
    console.error("[Vercel API Handler Error]:", err);
    return res.status(500).json({
      error: "API Handler Execution Failed",
      message: err?.message || String(err),
      cwd: process.cwd(),
      dirname: typeof __dirname !== "undefined" ? __dirname : "undefined",
    });
  }
}
