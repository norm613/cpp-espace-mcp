# eSpace MCP Server

MCP server providing Claude Code access to the eSpace facilities management REST API.

## eSpace Data Safety — MANDATORY

**NEVER create, update, or delete records in eSpace without explicit user confirmation first.**

eSpace manages real facility work orders, events, equipment, and maintenance schedules. Unauthorized writes can create false work orders, cancel events, or corrupt maintenance records.

**Before ANY write operation** (POST, PUT, DELETE to any eSpace endpoint):

1. **Stop.** Do not execute the operation.
2. **Show the user** exactly what will be created/modified/deleted.
3. **Wait for explicit confirmation** before proceeding.

**Read-only operations are always fine** — GET requests to list/detail endpoints.

## Architecture

Follows the same layered pattern as MPNext's Ministry Platform provider:

```
MCP Tool Handlers (one tool per API operation)
  → eSpaceProvider (singleton orchestrator)
    → Services (WorkOrderService, EventService, etc.)
      → eSpaceClient (JWT token lifecycle)
        → HttpClient (generic HTTP with bearer token injection)
```

## Auth Flow

1. POST `{ apiKey: "..." }` to `/api/v2/requesttoken`
2. Response is a JWT token string
3. All subsequent requests use `Authorization: Bearer <jwt>`

## Commands

- `npm run build` — TypeScript compilation
- `npm run dev` — Run with tsx (development)
- `npm run start` — Run compiled output
- `npm run generate:types` — Regenerate TS interfaces + Zod schemas from swagger.json

## Environment Variables

- `ESPACE_API_KEY` — eSpace API key (UUID format)
- `ESPACE_BASE_URL` — eSpace API base URL (default: `https://api.espace.cool`)

## Generated Types

Types in `src/models/` are auto-generated from `swagger.json` by `src/scripts/generate-types.ts`.
Do not edit generated files manually — regenerate with `npm run generate:types`.
