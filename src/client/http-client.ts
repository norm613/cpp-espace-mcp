/**
 * HttpClient — Generic HTTP client with automatic bearer token injection.
 * Ported from MPNext's HttpClient pattern.
 */

export type QueryParams = Record<
  string,
  string | number | boolean | undefined | null
>;

export class HttpClient {
  private baseUrl: string;
  private getToken: () => string;

  constructor(baseUrl: string, getToken: () => string) {
    this.baseUrl = baseUrl;
    this.getToken = getToken;
  }

  async get<T = unknown>(
    endpoint: string,
    queryParams?: QueryParams
  ): Promise<T> {
    const url = this.buildUrl(endpoint, queryParams);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(
        `GET ${endpoint} failed: ${response.status} ${response.statusText}${body ? ` — ${body}` : ""}`
      );
    }

    return (await response.json()) as T;
  }

  async post<T = unknown>(
    endpoint: string,
    body?: Record<string, unknown>,
    queryParams?: QueryParams
  ): Promise<T> {
    const url = this.buildUrl(endpoint, queryParams);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const responseBody = await response.text().catch(() => "");
      throw new Error(
        `POST ${endpoint} failed: ${response.status} ${response.statusText}${responseBody ? ` — ${responseBody}` : ""}`
      );
    }

    return (await response.json()) as T;
  }

  async put<T = unknown>(
    endpoint: string,
    body: Record<string, unknown>,
    queryParams?: QueryParams
  ): Promise<T> {
    const url = this.buildUrl(endpoint, queryParams);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const responseBody = await response.text().catch(() => "");
      throw new Error(
        `PUT ${endpoint} failed: ${response.status} ${response.statusText}${responseBody ? ` — ${responseBody}` : ""}`
      );
    }

    return (await response.json()) as T;
  }

  async delete<T = unknown>(
    endpoint: string,
    queryParams?: QueryParams
  ): Promise<T> {
    const url = this.buildUrl(endpoint, queryParams);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const responseBody = await response.text().catch(() => "");
      throw new Error(
        `DELETE ${endpoint} failed: ${response.status} ${response.statusText}${responseBody ? ` — ${responseBody}` : ""}`
      );
    }

    // Some DELETE endpoints may return empty body
    const text = await response.text();
    if (!text) return {} as T;
    return JSON.parse(text) as T;
  }

  public buildUrl(endpoint: string, queryParams?: QueryParams): string {
    const url = `${this.baseUrl}${endpoint}`;
    if (!queryParams) return url;

    const queryString = this.buildQueryString(queryParams);
    return queryString ? `${url}?${queryString}` : url;
  }

  private buildQueryString(params: QueryParams): string {
    return Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");
  }
}
