# cpp-espace-mcp

MCP server that gives Claude Code access to the [eSpace](https://espace.cool) facilities management API — work orders, events, equipment, and maintenance schedules, all callable from within a Claude conversation. Built for Catholic Parishes in Partnership (CPP) staff.

---

## Quick Start

If you just want to get this running on your machine. **Pick the section for your platform** — the two differ in more than path syntax.

### Windows (PowerShell)

```powershell
# 1. Install Node.js LTS if you don't have it
winget install OpenJS.NodeJS.LTS
# (close and reopen PowerShell)

# 2. Clone and build
mkdir $env:USERPROFILE\code -Force
cd $env:USERPROFILE\code
git clone https://github.com/norm613/cpp-espace-mcp.git
cd cpp-espace-mcp
npm install
npm run build

# 3. Get your personal API key from your eSpace profile (see section below)

# 4. Register with Claude Code (user scope — available in every project)
claude mcp add espace --scope user --env ESPACE_API_KEY=YOUR_KEY_HERE -- cmd /c npx tsx "$env:USERPROFILE\code\cpp-espace-mcp\src\index.ts"

# 5. Verify
claude mcp list
# 'espace' should show: ✓ Connected
```

### macOS / Linux

```bash
# 1. Install Node.js LTS if you don't have it
brew install node          # macOS; on Linux use your package manager or nodesource

# 2. Clone and build
mkdir -p ~/code && cd ~/code
git clone https://github.com/norm613/cpp-espace-mcp.git
cd cpp-espace-mcp
npm install
npm run build

# 3. Get your personal API key from your eSpace profile (see section below)

# 4. Register with Claude Code (user scope — available in every project)
claude mcp add espace --scope user --env ESPACE_API_KEY=YOUR_KEY_HERE -- node ~/code/cpp-espace-mcp/dist/index.js

# 5. Verify
claude mcp list
# 'espace' should show: ✓ Connected
```

**Three things differ from the Windows command, and they matter:**

1. **No `cmd /c`.** That wrapper is a Windows shell shim. Including it on macOS or Linux fails with `spawn cmd ENOENT`.
2. **Run the compiled `dist/index.js` with `node`, not `npx tsx src/index.ts`.** Step 2 already built `dist/`, `tsx` is frequently not installed, and running compiled output skips a transpile on every server launch. The `tsx` form still works if you prefer it — `npx tsx ~/code/cpp-espace-mcp/src/index.ts` — but it's slower and adds a dependency you don't need.
3. **No `MSYS_NO_PATHCONV` concerns.** That workaround exists only for Git Bash on Windows mangling `/c`. Ignore it here.

Then relaunch Claude Code. Ask it something like "check eSpace for any open work orders at PJCC" to confirm it works.

### If you don't have the `claude` CLI (Claude Code desktop app)

The desktop app ships without the CLI, so `claude mcp add` won't exist. Add the entry to `~/.claude.json` by hand instead, under the top-level `mcpServers` key. **Back the file up first** — it holds all your other server configs and session state:

```bash
cp ~/.claude.json ~/.claude.json.bak
```

```json
"espace": {
  "type": "stdio",
  "command": "/opt/homebrew/bin/node",
  "args": ["/Users/YOUR_USERNAME/code/cpp-espace-mcp/dist/index.js"],
  "env": { "ESPACE_API_KEY": "YOUR_KEY_HERE" }
}
```

Use the **absolute path to node** — `/opt/homebrew/bin/node` on Apple Silicon, `/usr/local/bin/node` on Intel Macs or Homebrew-on-Linux. Find yours with `which node`. A bare `"node"` can fail because the desktop app's `PATH` is not your shell's `PATH`.

`args` must also be an absolute path; `~` is not expanded here.

Validate before relaunching — a malformed file stops Claude Code from starting:

```bash
python3 -c "import json; json.load(open('$HOME/.claude.json')); print('valid')"
```

---

## Why Each Person Runs Their Own Instance

The eSpace API key isn't just a password — **it's your identity to eSpace**. Every API call this server makes is attributed to whoever owns the key. If two people share a key, both show up in the audit trail as the same person.

That's why each CPP staff member who uses Claude with eSpace needs:
1. Their own API key, generated under their own eSpace profile
2. Their own clone of this repo on their local machine
3. Their own Claude Code MCP registration using their own key

There's no shared server, no multi-tenant auth. One key = one person.

---

## Getting Your API Key

1. Sign in to eSpace on the web as yourself.
2. Navigate to your user profile / account settings.
3. Find the API access / tokens section and generate a new personal API key.
4. Copy the UUID-format string. **Store it like a password** — anyone with this key can make changes as you.

If you can't find where to generate a key, check with whoever administers your eSpace account.

---

## Prerequisites Checklist

Before running the install steps, make sure you have:

- [ ] **A supported OS** — Windows 10/11 with PowerShell, **or** macOS, **or** Linux. Nothing in this server is Windows-specific; only the registration command differs.
- [ ] **Node.js LTS** — `node --version` should return a number. If not: `winget install OpenJS.NodeJS.LTS` (Windows, then close/reopen PowerShell so `PATH` updates) or `brew install node` (macOS).
- [ ] **Git** — `git --version` should work. If not: `winget install Git.Git` (Windows); macOS installs it with the Xcode command line tools (`xcode-select --install`).
- [ ] **Claude Code** — either the CLI (`claude --version` works) or the desktop app. **The desktop app has no CLI**, so use the hand-edited `~/.claude.json` route in the Quick Start rather than `claude mcp add`.
- [ ] **An eSpace API key** (see above)

---

## Claude Code Configuration — Details

The command in the Quick Start registers the MCP server at **user scope**, meaning it's available in every Claude Code project you open (not tied to a specific folder). This is the right scope for eSpace — you'll want it available in Oscar, Robin, or any other vault.

If you need to update the key later (rotation, regenerated key, etc.):

```powershell
# Windows
claude mcp remove espace --scope user
claude mcp add espace --scope user --env ESPACE_API_KEY=NEW_KEY -- cmd /c npx tsx "$env:USERPROFILE\code\cpp-espace-mcp\src\index.ts"
```

```bash
# macOS / Linux
claude mcp remove espace --scope user
claude mcp add espace --scope user --env ESPACE_API_KEY=NEW_KEY -- node ~/code/cpp-espace-mcp/dist/index.js
```

On the desktop app (no CLI), edit the `ESPACE_API_KEY` value in `~/.claude.json` directly and relaunch.

To see current status:

```powershell
claude mcp get espace
```

### Verifying without the CLI

`claude mcp list` doesn't exist on the desktop app, and relaunching just to find out whether a key works is slow. You can talk to the server directly — pipe two JSON-RPC frames into it over stdio:

```bash
cd ~/code/cpp-espace-mcp
printf '%s\n' \
  '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"probe","version":"1"}}}' \
  '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"get-locations","arguments":{}}}' \
  | ESPACE_API_KEY="YOUR_KEY_HERE" node dist/index.js
```

A working setup returns the server handshake, then a `get-locations` payload listing your org's locations.

⚠️ **The handshake alone proves nothing about your key.** `initialize` succeeds with a completely invalid key — the server doesn't contact eSpace until the first real tool call. Always verify with an actual call like `get-locations`, not just a successful startup. This is the single most common way a broken eSpace registration looks healthy.

---

## Data Safety Rules (Read This)

**Claude must never create, update, or delete eSpace records without your explicit confirmation first.**

eSpace manages real facility work orders, events, equipment, and maintenance schedules. Unauthorized writes can create false work orders, cancel events, or corrupt maintenance records.

Before any write operation (POST / PUT / DELETE), Claude will:

1. **Stop.**
2. **Show you** exactly what it plans to create, modify, or delete.
3. **Wait for your explicit "yes"** before proceeding.

Read-only operations (listing, getting details) are always fine — no confirmation required.

If Claude ever performs a write without asking first, that's a bug — report it.

---

## Available Tools (29 total)

| Category | Tools | Typical use |
|---------|-------|-------------|
| **Work Orders** | `get-work-order`, `list-work-orders`, `create-work-order`, `update-work-order`, `delete-work-order`, `get-work-order-tasks`, `add-work-order-task`, `update-work-order-task`, `get-work-order-costs`, `get-work-order-attachments`, `get-work-order-priorities`, `get-work-order-statuses` | "Show me all open work orders at SPE," "Create a work order for the boiler at PJCC," "What's the cost breakdown on work order 1234?" |
| **Events** | `get-event`, `list-events`, `get-event-occurrences`, `get-event-spaces` | "List next week's events at STC," "What spaces are booked for Holy Thursday?" |
| **Maintenance** | `get-maintenance`, `list-maintenance`, `get-maintenance-types`, `get-maintenance-spaces`, `get-frequency-types` | "Show me all scheduled maintenance coming due," "What PM frequency types are defined?" |
| **Equipment** | `get-equipment`, `list-equipment`, `get-equipment-types` | "List the HVAC equipment at SJD," "What equipment types do we track?" |
| **Ministry / Org** | `get-locations`, `get-users`, `get-categories`, `get-service-categories`, `get-editors`, `get-task-templates` | "List all the locations in our eSpace tenant," "Who has editor permissions?" |

Full tool registration list is in [`src/index.ts`](src/index.ts).

---

## Troubleshooting

### `claude mcp list` shows eSpace as "Failed to connect"

The `mcp list` output doesn't include the real error. To see it, run the stdio command by hand:

```powershell
# Windows
$env:ESPACE_API_KEY = "your-key"
cmd /c npx tsx "$env:USERPROFILE\code\cpp-espace-mcp\src\index.ts"
```

```bash
# macOS / Linux
ESPACE_API_KEY="your-key" node ~/code/cpp-espace-mcp/dist/index.js
```

Common causes:
- **Node.js not installed** — `node --version` returns nothing → `winget install OpenJS.NodeJS.LTS` (Windows) / `brew install node` (macOS)
- **Node installed but PATH not refreshed** — close and reopen PowerShell
- **Firewall blocking npm** — `npm install` hung or failed during setup → talk to IT
- **Wrong API key** — you'll see a 401 from eSpace; generate a new key and re-register
- **Repo not built** — `npm run build` was skipped; run it
- **File path has spaces or quotes** — the path in the `claude mcp add` command should be wrapped in double quotes

**macOS / Linux specific:**
- **`spawn cmd ENOENT`** — you copied the Windows command with its `cmd /c` wrapper. Drop it; that shim is Windows-only.
- **Works in your terminal but fails from the app** — you registered a bare `"node"`. The desktop app's `PATH` is not your shell's. Use the absolute path from `which node`.
- **`~` in the config didn't resolve** — `~/.claude.json` does not expand tildes inside `args`. Write the full `/Users/you/...` path.
- **Starts fine but every call 401s** — the key is wrong, not the install. `initialize` never contacts eSpace, so a bad key looks like a healthy server until the first real call.

### "Add to user config" succeeded but path looks wrong (`C:/` instead of `/c`)

If you ran `claude mcp add` from Git Bash, path conversion may have mangled the `/c` flag on `cmd /c`. Remove and re-add from **PowerShell**, not Git Bash:

```powershell
claude mcp remove espace --scope user
claude mcp add espace --scope user --env ESPACE_API_KEY=YOUR_KEY -- cmd /c npx tsx "$env:USERPROFILE\code\cpp-espace-mcp\src\index.ts"
```

### The key works for others but not me

Make sure the key is yours — generated under *your* eSpace profile. Keys are user-specific; another person's key won't authenticate you (and will wrongly attribute your actions).

### Claude says it did something but eSpace doesn't reflect the change

- Did Claude confirm with you first? If no confirmation prompt, the write was likely blocked (safety rule) and Claude only simulated it.
- Is your key read-only in eSpace? Check your eSpace profile for write permissions.

### I need to update types after an eSpace API change

```powershell
cd $env:USERPROFILE\code\cpp-espace-mcp
git pull
npm install
npm run generate:types
npm run build
```

---

## Development

```powershell
npm run dev              # run with tsx (hot reload during development)
npm run build            # compile TypeScript to dist/
npm run start            # run the compiled output
npm run generate:types   # regenerate TS interfaces + Zod schemas from swagger.json
```

Types in `src/models/` are **auto-generated** from `swagger.json`. Don't edit them manually — regenerate with `npm run generate:types`.

Architecture is a layered pattern:

```
MCP Tool Handlers (one tool per API operation)
  → eSpaceProvider (singleton orchestrator)
    → Services (WorkOrderService, EventService, MaintenanceService, etc.)
      → eSpaceClient (JWT token lifecycle)
        → HttpClient (generic HTTP with bearer token injection)
```

Auth flow: POST `{ apiKey }` to `/api/v2/requesttoken` → receive a JWT (valid ~1 year) → include it as `Authorization: Bearer <jwt>` on all subsequent requests.

---

## For Claude Sessions Working on This Repo

See [`CLAUDE.md`](CLAUDE.md) — it has project-specific instructions for a Claude instance opened inside this repo (safety rules, architecture pointers, type regeneration steps).

---

## License

Private — all rights reserved. See [`LICENSE`](LICENSE).

This repository is published publicly so authorized CPP staff can clone and install it without needing a GitHub account, but the code itself is not open-source. No license is granted to copy, modify, or redistribute.
