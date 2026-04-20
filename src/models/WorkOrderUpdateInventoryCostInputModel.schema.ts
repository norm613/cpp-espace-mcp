import { z } from "zod";

export const WorkOrderUpdateInventoryCostInputModelSchema = z.object({
  InventoryId: z.number().int().optional(),
  Quantity: z.number().int().optional(),
  LocationId: z.number().int().optional(),
  Id: z.number().int().optional(),
  Name: z.string().optional(),
  Note: z.string().optional(),
});
