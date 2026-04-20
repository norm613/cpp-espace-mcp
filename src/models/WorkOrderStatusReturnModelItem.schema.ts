import { z } from "zod";

export const WorkOrderStatusReturnModelItemSchema = z.object({
  Name: z.string().optional(),
  Id: z.number().int().optional(),
  SortOrder: z.number().int().optional(),
});
