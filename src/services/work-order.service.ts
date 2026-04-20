/**
 * WorkOrderService — CRUD operations for eSpace work orders.
 */

import { eSpaceClient } from "../client/espace-client.js";

export class WorkOrderService {
  constructor(private client: eSpaceClient) {}

  async getWorkOrder(workOrderId: number, include?: string) {
    await this.client.ensureValidToken();
    const params: Record<string, string | number> = { workOrderId };
    if (include) params.include = include;
    return this.client.getHttpClient().get("/api/v2/workorder", params);
  }

  async listWorkOrders(params: {
    locationId?: number;
    statusId?: number;
    priorityId?: number;
    assignedId?: number;
    serviceCategoryId?: number;
    startDate?: string;
    endDate?: string;
    include?: string;
  } = {}) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/workorder/list", params as Record<string, string | number>);
  }

  async createWorkOrder(model: {
    FullDescription: string;
    LocationId: number;
    ServiceCategoryId: number;
    PriorityId: number;
    Eta?: string;
    AssignedId?: number;
    VendorAssignedId?: number;
    VendorContactId?: number;
    AssignedDepartmentId?: number;
  }) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().post("/api/v2/workorder/create", model);
  }

  async updateWorkOrder(model: {
    WorkOrderId: number;
    FullDescription?: string;
    LocationId?: number;
    ServiceCategoryId?: number;
    PriorityId?: number;
    StatusId?: number;
    Eta?: string;
    AssignedId?: number;
    VendorAssignedId?: number;
    VendorContactId?: number;
    AssignedDepartmentId?: number;
  }) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().put("/api/v2/workorder/update", model);
  }

  async deleteWorkOrder(workOrderId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().delete("/api/v2/workorder/delete", { workOrderId });
  }

  async getSpaces(workOrderId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/workorder/spaces", { workOrderId });
  }

  async addSpaces(workOrderId: number, spaceIds: number[]) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().post("/api/v2/workorder/spaces/add", { WorkOrderId: workOrderId, SpaceIds: spaceIds });
  }

  async removeSpaces(workOrderId: number, spaceIds: number[]) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().delete("/api/v2/workorder/spaces/remove", { workOrderId, spaceIds: spaceIds.join(",") });
  }

  async getCosts(workOrderId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/workorder/costs", { workOrderId });
  }

  async getTasks(workOrderId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/workorder/tasks", { workOrderId });
  }

  async addTask(workOrderId: number, task: {
    Description?: string;
    DueDate?: string;
    TotalMinutes?: number;
    AssignedToUserId?: number;
    AssignedToDepartmentId?: number;
    AssignedToVendorContactId?: number;
  }) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().post("/api/v2/workorder/tasks/add", { ...task, WorkOrderId: workOrderId });
  }

  async updateTask(taskId: number, task: {
    Description?: string;
    DueDate?: string;
    TotalMinutes?: number;
    AssignedToUserId?: number;
    IsCompleted?: boolean;
  }) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().put("/api/v2/workorder/tasks/update", { ...task, Id: taskId });
  }

  async deleteTask(taskId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().delete("/api/v2/workorder/tasks/delete", { taskId });
  }

  async getAttachments(workOrderId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().get("/api/v2/workorder/attachments", { workOrderId });
  }

  async getPriorities(workOrderId?: number) {
    await this.client.ensureValidToken();
    const params: Record<string, number> = {};
    if (workOrderId !== undefined) params.workOrderId = workOrderId;
    return this.client.getHttpClient().get("/api/v2/workorder/priority", params);
  }

  async getStatuses(workOrderId?: number) {
    await this.client.ensureValidToken();
    const params: Record<string, number> = {};
    if (workOrderId !== undefined) params.workOrderId = workOrderId;
    return this.client.getHttpClient().get("/api/v2/workorder/status", params);
  }

  async addLaborCost(model: Record<string, unknown>) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().post("/api/v2/workorder/costs/add/labor", model);
  }

  async addMiscCost(model: Record<string, unknown>) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().post("/api/v2/workorder/costs/add/miscellaneous", model);
  }

  async addEquipmentCost(model: Record<string, unknown>) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().post("/api/v2/workorder/costs/add/equipment", model);
  }

  async addInventoryCost(model: Record<string, unknown>) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().post("/api/v2/workorder/costs/add/inventory", model);
  }

  async addVehicleCost(model: Record<string, unknown>) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().post("/api/v2/workorder/costs/add/vehicle", model);
  }

  async deleteCost(costId: number) {
    await this.client.ensureValidToken();
    return this.client.getHttpClient().delete("/api/v2/workorder/costs/delete", { costId });
  }
}
