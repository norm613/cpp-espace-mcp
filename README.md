# cpp-espace-mcp

MCP server that exposes the [eSpace](https://espace.cool) facilities management REST API to Claude Code. Built for Catholic Parishes in Partnership (CPP) staff to manage work orders, events, equipment, and maintenance from within Claude.

## Per-User Deployment Model

**Every user runs their own instance.** The eSpace API key identifies the user in eSpace's audit trail — shared keys would attribute every action to whoever owns the key, defeating accountability.

Each CPP staff member who needs eSpace access:
1. Obtains their own API key from their eSpace profile
2. Clones this repo to their machine
3. Configures Claude Code to launch it with their key as `ESPACE_API_KEY`

## Prerequisites

- Node.js LTS (≥ 18). On Windows: `winget install OpenJS.NodeJS.LTS`
- Claude Code CLI, signed in to claude.ai
- An eSpace API key (see *Getting Your API Key* below)

## Install

```powershell
# Clone into a persistent location outside your Obsidian vault
mkdir $env:USERPROFILE\code -Force
cd $env:USERPROFILE\code
git clone https://github.com/norm613/cpp-espace-mcp.git
cd cpp-espace-mcp
npm install
npm run build
```

## Getting Your API Key

1. Sign in to eSpace as yourself.
2. Go to your user profile.
3. Generate or copy your personal API key (UUID format).
4. Store it securely — treat it like a password.

## Configure Claude Code

Register the MCP server at **user scope** so it's available in every Claude Code project. Run this in a regular PowerShell window (not inside Claude Code), substituting your own API key:

```powershell
claude mcp add espace --scope user --env ESPACE_API_KEY=<your-key-here> -- cmd /c npx tsx $env:USERPROFILE\code\cpp-espace-mcp\src\index.ts
```

Then relaunch Claude Code. Verify with `claude mcp list` — `espace` should show **Connected**. If it says "Failed to connect," run the command by hand (`cmd /c npx tsx <path>\src\index.ts`) with the key set in your environment to see the real error.

## Data Safety Rules (MANDATORY)

**Never create, update, or delete eSpace records without explicit user confirmation first.**

eSpace manages real facility work orders, events, equipment, and maintenance schedules. Unauthorized writes can create false work orders, cancel events, or corrupt maintenance records.

Before any write operation (POST / PUT / DELETE):

1. **Stop.** Do not execute.
2. **Show the user** exactly what will be created, modified, or deleted.
3. **Wait for explicit confirmation** before proceeding.

Read-only operations (GET) are always fine.

## Available Tools

29 tools across these categories — see `src/index.ts` for the full registration list.

| Category | Tools |
|---------|-------|
| Work Orders | get, list, create, update, delete, tasks (get/add/update), costs, attachments, priorities, statuses |
| Ministry / Org | locations, users, categories, service categories, editors, task templates |
| Maintenance | get, list, types, frequency types |
| Events | get, list, occurrences |
| Equipment | get, list, types |

## Development

```powershell
npm run dev              # run with tsx (development)
npm run build            # compile to dist/
npm run start            # run compiled output
npm run generate:types   # regenerate TS interfaces + Zod schemas from swagger.json
```

Types in `src/models/` are auto-generated from `swagger.json`. Do not edit them manually — regenerate.

## Architecture

Layered pattern mirroring the MPNext Ministry Platform provider:

```
MCP Tool Handlers (one tool per API operation)
  → eSpaceProvider (singleton orchestrator)
    → Services (WorkOrderService, EventService, etc.)
      → eSpaceClient (JWT token lifecycle)
        → HttpClient (generic HTTP with bearer token injection)
```

Auth flow: POST `{ apiKey }` to `/api/v2/requesttoken` → receive JWT → include as `Authorization: Bearer <jwt>` on all subsequent requests. JWTs are long-lived (~1 year).

## Related

- `CLAUDE.md` — in-repo instructions for Claude Code sessions working *on* this server
- [eSpace API documentation](https://api.espace.cool) (swagger.json captured in repo)

## License

Private — internal use at Catholic Parishes in Partnership. Not licensed for redistribution.
