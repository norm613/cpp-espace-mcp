import { z } from "zod";

export const ApiOccurrenceItemInfoSchema = z.object({
  ItemId: z.number().int().optional(),
  ItemType: z.string().optional(),
  Name: z.string().optional(),
  Qty: z.number().int().optional(),
});
