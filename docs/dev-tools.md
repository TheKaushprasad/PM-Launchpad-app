# Dev tools for Claude Code

Extra skills and MCP servers that help Claude Code work on this repo. Added 2026-10-23.

## What lives in the repo

These load by themselves when you open Claude Code in the repo folder. Nothing to install.

| Tool | Where | What it does |
|---|---|---|
| Vercel agent skills | `.claude/skills/vercel-react-best-practices`, `vercel-composition-patterns`, `web-design-guidelines` | React performance rules, component patterns, and a UI and accessibility review ("review my UI") from Vercel |
| Strix skills | `.claude/skills/penetration-testing-with-strix`, `find-security-vulnerabilities-in-code`, `fix-security-vulnerabilities-with-strix`, `web-app-penetration-testing` | Teach Claude how to run Strix scans and fix what they find. Running a scan needs the local install below |
| 21st skill | `.claude/skills/21st-ui` | Tells Claude when and how to use the 21st MCP to find React/Tailwind components |
| MCP servers | `.mcp.json` | `shadcn` (component registry), `context7` (current library docs), `21st` (21st.dev component search; needs a key) |

Each copied skill has a `SOURCE.md` with the upstream commit. To update one, copy the folder from upstream again.

Run output folders `graphify-out/` and `strix_runs/` are gitignored.

## Setup on your laptop (Windows, PowerShell)

Open PowerShell in `D:\THENOOBPM\PM-Launchpad-app` for every step unless it says otherwise.

### 1. Pull the changes (do this first)

You already have your own `.mcp.json` with shadcn in it. The repo now has one too (it includes shadcn), so move yours aside first or `git pull` will refuse:

```powershell
Rename-Item .mcp.json .mcp.json.backup
git pull
```

If your old file had anything besides shadcn, tell Claude and it will be merged in. Otherwise delete the backup: `Remove-Item .mcp.json.backup`.

Next time you start `claude` here, it asks whether to trust the project's MCP servers. Pick **Use this and all future MCP servers in this project**.

### 2. Context7 (current docs for React, Vite, Firebase and so on)

Nothing to do. It works without a key. Type `/mcp` inside Claude Code and check that `context7` says connected. You can also say "use context7" in a prompt to force it.

### 3. 21st.dev (component search)

1. Go to https://21st.dev/mcp and sign in (Google or GitHub works).
2. Copy your API key. Old "Magic" keys no longer work, so make a new one.
3. In PowerShell run (paste your key between the quotes):
   ```powershell
   setx API_KEY_21ST "paste-key-here"
   ```
4. Close every PowerShell window and VS Code, open a new one, then start `claude` again. Type `/mcp` and check that `21st` is connected.

Free tier: search is free, about 2 component installs per day.

### 4. Graphify (a map of the codebase Claude can query)

1. Install uv (a Python tool installer):
   ```powershell
   winget install astral-sh.uv
   ```
   Close and reopen PowerShell. If you have no Python 3.10 or newer, also run `winget install Python.Python.3.12`.
2. Install Graphify and hook it into Claude Code:
   ```powershell
   uv tool install graphifyy
   graphify install
   ```
   (`graphifyy` with two y's is the real package name.) If it says `graphify` is not found, run `uv tool update-shell`, reopen PowerShell and try again.
3. In Claude Code, inside the repo, type `/graphify .`
4. It writes `graphify-out/` (gitignored). Open `graphify-out/graph.html` in Chrome to see the map. Re-run `/graphify .` after big changes.

Code is parsed on your machine with no AI. Docs and PDFs get an AI pass that uses your Claude usage.

### 5. Strix (AI security testing)

Strix attacks the target to prove bugs, so only point it at code or sites you own.

1. Install Docker Desktop: `winget install Docker.DockerDesktop`, restart the laptop, open Docker Desktop and wait until it says "Engine running".
2. Install Strix (uv from step 4):
   ```powershell
   uv tool install strix-agent
   ```
3. Give it an AI key. Your paid OpenAI key works:
   ```powershell
   setx STRIX_LLM "openai/gpt-5.4"
   setx LLM_API_KEY "your-openai-key"
   ```
   Close and reopen PowerShell.
4. Run a quick scan of the code with a spending cap of about $5:
   ```powershell
   strix -n --target ./ --scan-mode quick --max-budget 5
   ```
   The first run downloads the sandbox image (a few minutes). Results land in `strix_runs\<run-name>\`.
5. Ask Claude: "Read the latest strix_runs report and fix the findings." The fix skill guides it.

Avoid scanning the live site thenoobpm.com: it sends real attack traffic at Firebase and the APIs. Scan a Vercel preview URL instead if you want a live test. The scan sends code to OpenAI.

### 6. gstack (Garry Tan's set of Claude Code skills)

gstack is about 100 MB and builds its own tools, so it is installed once for your user, not copied into the repo. It adds about 40 slash commands such as `/office-hours`, `/autoplan`, `/review`, `/qa <url>`, `/cso` and `/ship`.

1. Install what it needs (skip any you have):
   ```powershell
   winget install --id Git.Git -e
   winget install --id Oven-sh.Bun -e
   winget install --id OpenJS.NodeJS.LTS -e
   ```
   Close and reopen PowerShell.
2. Download and set it up:
   ```powershell
   git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git "$HOME\.claude\skills\gstack"
   cd "$HOME\.claude\skills\gstack"
   powershell -ExecutionPolicy Bypass -File .\setup.ps1
   ```
3. Restart Claude Code and try `/office-hours`.

`/cso` (its security audit) needs Visual Studio Build Tools on Windows and will say "not assessed" without them; use Strix for security instead. gstack's "team mode" would add hooks to the repo; it is not set up here.

To remove gstack later, delete the folder `C:\Users\<you>\.claude\skills\gstack`.
