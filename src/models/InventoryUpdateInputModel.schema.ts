import { z } from "zod";

export const InventoryUpdateInputModelSchema = z.object({
  LocationId: z.number().int(),
  Quantity: z.number().int(),
  AdjustmentNote: z.string().optional(),
});
