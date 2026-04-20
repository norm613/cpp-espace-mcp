import { z } from "zod";

export const ApiInventoryGroupDtoSchema = z.object({
  Id: z.number().int().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  CreatedBy: z.string().optional(),
  CreatedById: z.number().int().optional(),
  CreatedOn: z.string().datetime().or(z.string()).optional(),
  UpdatedOn: z.string().datetime().or(z.string()).optional(),
});
