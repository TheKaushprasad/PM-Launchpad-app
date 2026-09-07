import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createExpressApp } from "../server";

let cachedApp: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!cachedApp) {
    cachedApp = await createExpressApp();
  }
  return cachedApp(req, res);
}
