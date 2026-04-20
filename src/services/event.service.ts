/**
 * EventService — Event scheduling and management.
 */

import { eSpaceClient } from "../client/espace-client.js";

export class EventService {
  constructor(private client: eSpaceClient) {}

  async getEvent(eventId: number, include?: string) {
    await this.client.ensureValidToken();
    const params: Record<string, string | number> = { eventId };
    if (include) params.include = include;
    return this.client.getHttpClient().get("/api/v2/event", params);
  }

  async listEvents(params: {
    locationId?: number;
    startDate?: string;
    endDate?: string;
    categoryId?: number;
    include?: string;
  } = {}) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/event/list", params as Record<string, string | number>);
  }

  async getOccurrences(eventId: number, params: {
    startDate?: string;
    endDate?: string;
  } = {}) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/event/occurrences", { eventId, ...params } as Record<string, string | number>);
  }

  async getSpaces(eventId: number, scheduleId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/event/spaces", { eventId, scheduleId });
  }

  async getResources(eventId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/event/resources", { eventId });
  }

  async getServices(eventId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/event/services", { eventId });
  }

  async createEvent(model: Record<string, unknown>) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().post("/api/v2/event/create", model);
  }

  async updateEvent(model: Record<string, unknown>) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().put("/api/v2/event/update", model);
  }

  async deleteEvent(eventId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().delete("/api/v2/event/delete", { eventId });
  }

  async cancelEvent(eventId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().put("/api/v2/event/cancel", { EventId: eventId });
  }
}
