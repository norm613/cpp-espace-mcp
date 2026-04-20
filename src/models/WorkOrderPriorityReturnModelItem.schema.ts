import { z } from "zod";

export const WorkOrderPriorityReturnModelItemSchema = z.object({
  Name: z.string().optional(),
  Id: z.number().int().optional(),
  SortOrder: z.number().int().optional(),
  ColorCode: z.string().optional(),
  TextColor: z.string().optional(),
});
