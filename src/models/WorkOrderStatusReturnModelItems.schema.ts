import { z } from "zod";
import { WorkOrderStatusReturnModelItemSchema } from "./WorkOrderStatusReturnModelItem.schema.js";

export const WorkOrderStatusReturnModelItemsSchema = z.object({
  Statuses: z.array(WorkOrderStatusReturnModelItemSchema).optional(),
});
