import { z } from "zod";

export const WorkOrderTaskDtoSchema = z.object({
  Id: z.number().int().optional(),
  AssignedTo: z.string().optional(),
  CompletedBy: z.string().optional(),
  Description: z.string().optional(),
  DueDate: z.string().datetime().or(z.string()).optional(),
  IsCompleted: z.boolean().optional(),
  DateCompleted: z.string().datetime().or(z.string()).optional(),
  TimeZone: z.string().optional(),
  WorkOrderId: z.number().int().optional(),
  TotalMinutes: z.number().int().optional(),
  TotalCompletedMinutes: z.number().int().optional(),
  AssignedToVendorId: z.number().int().optional(),
  AssignedToVendorContactId: z.number().int().optional(),
  AssignedToUserId: z.number().int().optional(),
  AssignedToDepartmentId: z.number().int().optional(),
  WorkOrderCostId: z.number().int().optional(),
  TotalCompleteMinutesItemCost: z.number().int().optional(),
  TotalEstimatedMinutesItemCost: z.number().int().optional(),
});
