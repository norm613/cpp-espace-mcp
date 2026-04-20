import { z } from "zod";

export const WorkOrderAddVehicleCostInputModelSchema = z.object({
  VehicleId: z.number().int().optional(),
  EquipmentId: z.number().int().optional(),
  EstimatedLaborCosts: z.number().optional(),
  EstimatedMaterialCosts: z.number().optional(),
  ActualLaborCosts: z.number().optional(),
  ActualMaterialCosts: z.number().optional(),
  Name: z.string().optional(),
  Note: z.string().optional(),
  CreationDate: z.string().datetime().or(z.string()).optional(),
});
