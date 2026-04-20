/**
 * eSpace JWT Token Management
 *
 * Requests a JWT token from the eSpace API using the API key,
 * and manages token lifecycle with automatic refresh.
 */

const TOKEN_REFRESH_BUFFER_MS = 5 * 60 * 1000; // Refresh 5 minutes before expiry
const DEFAULT_TOKEN_LIFETIME_MS = 55 * 60 * 1000; // Assume 55-minute lifetime if not decodable

export interface TokenState {
  token: string;
  expiresAt: Date;
}

/**
 * Request a new JWT token from the eSpace API.
 * POST /api/v2/requesttoken with { apiKey: "..." }
 */
export async function requestToken(
  baseUrl: string,
  apiKey: string
): Promise<string> {
  const response = await fetch(`${baseUrl}/api/v2/requesttoken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ apiKey }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `eSpace token request failed: ${response.status} ${response.statusText}${body ? ` — ${body}` : ""}`
    );
  }

  const token = await response.text();
  // Response may be a quoted string — strip quotes if present
  return token.replace(/^"|"$/g, "");
}

/**
 * Parse JWT expiry from the token payload (without verifying signature).
 * Falls back to a default lifetime if parsing fails.
 */
export function getTokenExpiry(token: string): Date {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Not a JWT");
    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf8")
    );
    if (payload.exp) {
      // exp is seconds since epoch; subtract buffer
      return new Date(payload.exp * 1000 - TOKEN_REFRESH_BUFFER_MS);
    }
  } catch {
    // Fall through to default
  }
  return new Date(Date.now() + DEFAULT_TOKEN_LIFETIME_MS);
}
