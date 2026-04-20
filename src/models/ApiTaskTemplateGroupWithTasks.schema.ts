import { z } from "zod";
import { ApiTaskTemplateInfoDtoSchema } from "./ApiTaskTemplateInfoDto.schema.js";

export const ApiTaskTemplateGroupWithTasksSchema = z.object({
  Tasks: z.array(ApiTaskTemplateInfoDtoSchema).optional(),
  Id: z.number().int().optional(),
  Name: z.string().optional(),
  CreatedOn: z.string().datetime().or(z.string()).optional(),
});
