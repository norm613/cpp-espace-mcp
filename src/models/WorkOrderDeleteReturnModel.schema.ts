import { z } from "zod";

export const WorkOrderDeleteReturnModelSchema = z.object({
  WorkOrderId: z.number().int().optional(),
  Status: z.string().optional(),
});
