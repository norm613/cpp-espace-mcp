import { z } from "zod";

export const ResourceItemSchema = z.object({
  Id: z.number().int().optional(),
  Quantity: z.number().int().optional(),
});
