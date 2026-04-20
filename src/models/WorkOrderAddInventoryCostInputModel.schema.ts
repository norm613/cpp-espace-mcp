import { z } from "zod";

export const WorkOrderAddInventoryCostInputModelSchema = z.object({
  InventoryId: z.number().int().optional(),
  Quantity: z.number().int().optional(),
  LocationId: z.number().int().optional(),
  Name: z.string().optional(),
  Note: z.string().optional(),
  CreationDate: z.string().datetime().or(z.string()).optional(),
});
