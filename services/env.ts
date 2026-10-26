import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

/**
 * Load environment variables from both project root and the services directory.
 * This is intentionally resilient to case-sensitive filesystems and to running the
 * app from different working directories.
 */
export function loadAppEnv(): void {
  const envCandidates = new Set<string>();
  const searchDirs = [
    path.resolve(process.cwd()),
    path.resolve(process.cwd(), 'services'),
  ];

  const maybeAdd = (candidate?: string) => {
    if (!candidate) return;
    envCandidates.add(path.resolve(candidate));
  };

  for (const searchDir of searchDirs) {
    if (!fs.existsSync(searchDir)) continue;
    const entries = fs.readdirSync(searchDir);
    const envFileName = entries.find((entry) => entry.toLowerCase() === '.env');
    if (envFileName) {
      maybeAdd(path.join(searchDir, envFileName));
    }
  }

  maybeAdd(path.resolve(process.cwd(), '.env'));
  maybeAdd(path.resolve(process.cwd(), '.ENV'));
  maybeAdd(path.resolve(process.cwd(), 'services', '.env'));
  maybeAdd(path.resolve(process.cwd(), 'services', '.ENV'));

  for (const envPath of envCandidates) {
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath, override: false });
    }
  }

  if (![...envCandidates].some((envPath) => fs.existsSync(envPath))) {
    dotenv.config();
  }
}
