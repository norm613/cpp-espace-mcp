import { z } from "zod";

export const MinistryEventCategorySchema = z.object({
  Id: z.number().int().optional(),
  Name: z.string().optional(),
  IsPublic: z.boolean().optional(),
});
