import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createExpressApp } from "./server";

let cachedApp: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!cachedApp) {
      cachedApp = await createExpressApp();
    }
    return cachedApp(req, res);
  } catch (err: any) {
    console.error("[Vercel API Handler Error]:", err);
    return res.status(500).json({
      error: "API Handler Execution Failed",
      message: err?.message || String(err),
    });
  }
}
