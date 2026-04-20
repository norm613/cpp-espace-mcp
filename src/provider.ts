/**
 * eSpaceProvider — Singleton provider orchestrating all eSpace services.
 * Same pattern as MPNext's MinistryPlatformProvider.
 */

import { eSpaceClient } from "./client/espace-client.js";
import {
  WorkOrderService,
  MinistryService,
  MaintenanceService,
  EventService,
  EquipmentService,
} from "./services/index.js";

export class eSpaceProvider {
  private static instance: eSpaceProvider;

  public workOrders: WorkOrderService;
  public ministry: MinistryService;
  public maintenance: MaintenanceService;
  public events: EventService;
  public equipment: EquipmentService;

  private constructor(baseUrl: string, apiKey: string) {
    const client = new eSpaceClient(baseUrl, apiKey);
    this.workOrders = new WorkOrderService(client);
    this.ministry = new MinistryService(client);
    this.maintenance = new MaintenanceService(client);
    this.events = new EventService(client);
    this.equipment = new EquipmentService(client);
  }

  public static getInstance(baseUrl?: string, apiKey?: string): eSpaceProvider {
    if (!this.instance) {
      if (!baseUrl || !apiKey) {
        throw new Error(
          "eSpaceProvider requires baseUrl and apiKey on first initialization"
        );
      }
      this.instance = new eSpaceProvider(baseUrl, apiKey);
    }
    return this.instance;
  }
}
