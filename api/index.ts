import type { VercelRequest, VercelResponse } from "@vercel/node";

let cachedApp: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!cachedApp) {
      const { createExpressApp } = await import("../server");
      cachedApp = await createExpressApp();
    }
    return cachedApp(req, res);
  } catch (err: any) {
    console.error("[Vercel API Handler Error]:", err);
    return res.status(500).json({
      error: "API Handler Execution Failed",
      message: err?.message || String(err),
      stack: process.env.NODE_ENV === "development" ? err?.stack : undefined,
    });
  }
}
