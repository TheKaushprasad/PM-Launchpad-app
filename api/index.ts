import type { VercelRequest, VercelResponse } from "@vercel/node";

let cachedApp: any = null;

async function getExpressApp() {
  if (cachedApp) return cachedApp;

  // 1. Try importing pre-bundled CommonJS server in the same directory (api/_server.cjs)
  try {
    // @ts-ignore
    const serverModule = await import("./_server.cjs");
    const createFn = serverModule.createExpressApp || serverModule.default?.createExpressApp;
    if (typeof createFn === "function") {
      cachedApp = await createFn();
      return cachedApp;
    }
  } catch (err) {
    console.warn("[Vercel Serverless] Could not import ./_server.cjs:", err);
  }

  // 2. Try importing root server
  try {
    const rootServer = await import("../server.js");
    const createFn = rootServer.createExpressApp || rootServer.default?.createExpressApp;
    if (typeof createFn === "function") {
      cachedApp = await createFn();
      return cachedApp;
    }
  } catch {
    const rootServer = await import("../server");
    const createFn = rootServer.createExpressApp || rootServer.default?.createExpressApp;
    if (typeof createFn === "function") {
      cachedApp = await createFn();
      return cachedApp;
    }
  }

  throw new Error("Could not load createExpressApp from any known server entry point");
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
    });
  }
}
