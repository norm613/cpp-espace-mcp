/**
 * eSpaceClient — Core HTTP client with automatic JWT token management.
 * Ported from MPNext's MinistryPlatformClient pattern.
 */

import { requestToken, getTokenExpiry, type TokenState } from "../auth/token.js";
import { HttpClient } from "./http-client.js";

export class eSpaceClient {
  private tokenState: TokenState = {
    token: "",
    expiresAt: new Date(0), // Force refresh on first call
  };
  private baseUrl: string;
  private apiKey: string;
  private httpClient: HttpClient;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.httpClient = new HttpClient(baseUrl, () => this.tokenState.token);
  }

  /**
   * Ensures the JWT token is valid, refreshing if necessary.
   * Must be called before every API request.
   */
  public async ensureValidToken(): Promise<void> {
    if (this.tokenState.expiresAt > new Date()) {
      return; // Token still valid
    }

    const token = await requestToken(this.baseUrl, this.apiKey);
    this.tokenState = {
      token,
      expiresAt: getTokenExpiry(token),
    };
  }

  public getHttpClient(): HttpClient {
    return this.httpClient;
  }
}
