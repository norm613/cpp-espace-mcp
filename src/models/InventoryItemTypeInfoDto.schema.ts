import { z } from "zod";

export const InventoryItemTypeInfoDtoSchema = z.object({
  Id: z.number().int().optional(),
  Name: z.string().optional(),
});
