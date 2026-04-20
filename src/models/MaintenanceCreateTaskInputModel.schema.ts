import { z } from "zod";

export const MaintenanceCreateTaskInputModelSchema = z.object({
  TaskTemplateId: z.number().int().optional(),
  Description: z.string().optional(),
  AssignedToUserId: z.number().int().optional(),
  Priority: z.number().int().optional(),
  TotalMinutes: z.number().int().optional(),
});
