/**
 * MinistryService — Organization-level lookups (locations, users, categories, etc.)
 */

import { eSpaceClient } from "../client/espace-client.js";

export class MinistryService {
  constructor(private client: eSpaceClient) {}

  async getLocations() {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/locations");
  }

  async getUsers() {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/users");
  }

  async getCategories() {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/categories");
  }

  async getServiceCategories() {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/servicecategories");
  }

  async getEditors() {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/editors");
  }

  async getInventoryCurrent() {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/inventory/current");
  }

  async getInventoryItem(itemId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/inventory/item", { itemId });
  }

  async getTaskTemplates() {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/task/list");
  }

  async getTaskGroups() {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/task/group/list");
  }
}
