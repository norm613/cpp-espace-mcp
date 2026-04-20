import { z } from "zod";

export const WorkOrderAddEquipmentCostInputModelSchema = z.object({
  EquipmentId: z.number().int().optional(),
  EstimatedLaborCosts: z.number().optional(),
  EstimatedMaterialCosts: z.number().optional(),
  ActualLaborCosts: z.number().optional(),
  ActualMaterialCosts: z.number().optional(),
  Name: z.string().optional(),
  Note: z.string().optional(),
  CreationDate: z.string().datetime().or(z.string()).optional(),
});
