import { z } from "zod";

export const WorkOrderUpdateMiscCostInputModelSchema = z.object({
  VendorId: z.number().int().optional(),
  EstimatedLaborCosts: z.number().optional(),
  EstimatedMaterialCosts: z.number().optional(),
  ActualLaborCosts: z.number().optional(),
  ActualMaterialCosts: z.number().optional(),
  Id: z.number().int().optional(),
  Name: z.string().optional(),
  Note: z.string().optional(),
});
