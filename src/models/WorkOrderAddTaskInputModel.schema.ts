import { z } from "zod";

export const WorkOrderAddTaskInputModelSchema = z.object({
  Description: z.string().optional(),
  DueDate: z.string().datetime().or(z.string()).optional(),
  TotalMinutes: z.number().int().optional(),
  AssignedToVendorContactId: z.number().int().optional(),
  AssignedToUserId: z.number().int().optional(),
  AssignedToDepartmentId: z.number().int().optional(),
  WorkOrderCostId: z.number().int().optional(),
  TotalEstimatedMinutesItemCost: z.number().int().optional(),
});
