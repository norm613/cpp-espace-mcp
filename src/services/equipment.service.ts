/**
 * EquipmentService — Equipment and vehicle management.
 */

import { eSpaceClient } from "../client/espace-client.js";

export class EquipmentService {
  constructor(private client: eSpaceClient) {}

  async getEquipment(equipmentId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/equipment", { equipmentId });
  }

  async listEquipment(params: {
    locationId?: number;
    equipmentTypeId?: number;
  } = {}) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/equipment/list", params as Record<string, string | number>);
  }

  async getEquipmentSpace(equipmentId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/equipment/space", { equipmentId });
  }

  async getEquipmentWorkOrders(equipmentId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/equipment/workorders", { equipmentId });
  }

  async getEquipmentTypes() {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/ministry/equipment/type");
  }

  async createEquipment(model: Record<string, unknown>) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().post("/api/v2/ministry/equipment/create", model);
  }

  async updateEquipment(model: Record<string, unknown>) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().put("/api/v2/ministry/equipment/update", model);
  }

  async deleteEquipment(equipmentId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().delete("/api/v2/ministry/equipment/delete", { equipmentId });
  }
}
