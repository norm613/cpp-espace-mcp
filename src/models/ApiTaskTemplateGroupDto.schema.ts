import { z } from "zod";

export const ApiTaskTemplateGroupDtoSchema = z.object({
  Id: z.number().int().optional(),
  Name: z.string().optional(),
  CreatedOn: z.string().datetime().or(z.string()).optional(),
});
