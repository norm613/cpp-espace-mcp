/**
 * MaintenanceService — Scheduled maintenance operations.
 */

import { eSpaceClient } from "../client/espace-client.js";

export class MaintenanceService {
  constructor(private client: eSpaceClient) {}

  async getMaintenance(maintenanceId: number, include?: string) {
    await this.client.ensureValidToken();
    const params: Record<string, string | number> = { maintenanceId };
    if (include) params.include = include;
    return this.client.getHttpClient().get("/api/v2/maintenance", params);
  }

  async listMaintenance(params: {
    locationId?: number;
    statusId?: number;
    maintenanceTypeId?: number;
    include?: string;
  } = {}) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/maintenance/list", params as Record<string, string | number>);
  }

  async createMaintenance(model: Record<string, unknown>) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().post("/api/v2/maintenance/create", model);
  }

  async updateMaintenance(model: Record<string, unknown>) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().put("/api/v2/maintenance/update", model);
  }

  async deleteMaintenance(maintenanceId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().delete("/api/v2/maintenance/delete", { maintenanceId });
  }

  async getSpaces(maintenanceId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/maintenance/spaces", { maintenanceId });
  }

  async getTasks(maintenanceId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/maintenance/tasks", { maintenanceId });
  }

  async getAttachments(maintenanceId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/maintenance/attachments", { maintenanceId });
  }

  async getWorkOrders(maintenanceId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/maintenance/workorders", { maintenanceId });
  }

  async getMaintenanceTypes() {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/maintenance/maintenancetype");
  }

  async getFrequencyTypes() {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/maintenance/frequencytype");
  }

  async getReminderTypes() {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/maintenance/remindertype");
  }
}
