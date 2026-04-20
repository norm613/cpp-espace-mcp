import { z } from "zod";

export const ApiItemInfoSchema = z.object({
  ItemId: z.number().int().optional(),
  ItemType: z.string().optional(),
  Name: z.string().optional(),
  LocationName: z.string().optional(),
  LocationId: z.number().int().optional(),
  Parent_id: z.number().int().optional(),
  ParentName: z.string().optional(),
  IsSchedulable: z.boolean().optional(),
  MaxCapacity: z.number().int().optional(),
});
