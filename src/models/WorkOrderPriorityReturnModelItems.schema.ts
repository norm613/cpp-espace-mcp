import { z } from "zod";
import { WorkOrderPriorityReturnModelItemSchema } from "./WorkOrderPriorityReturnModelItem.schema.js";

export const WorkOrderPriorityReturnModelItemsSchema = z.object({
  Priorities: z.array(WorkOrderPriorityReturnModelItemSchema).optional(),
});
