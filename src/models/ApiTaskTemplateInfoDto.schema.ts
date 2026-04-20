import { z } from "zod";

export const ApiTaskTemplateInfoDtoSchema = z.object({
  Id: z.number().int().optional(),
  Description: z.string().optional(),
  ServiceCategories: z.string().optional(),
  GroupNames: z.string().optional(),
  TaskOrderIndex: z.number().int().optional(),
  Minutes: z.number().int().optional(),
  HoursToDisplay: z.string().optional() /* readOnly */,
});
