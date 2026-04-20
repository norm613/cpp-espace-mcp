import { z } from "zod";

export const MaintenanceUpdateTaskInputModelSchema = z.object({
  ScheduledMaintenanceId: z.number().int().optional(),
  Description: z.string().optional(),
  IsCompleted: z.boolean().optional(),
  Priority: z.number().int().optional(),
  AssignedToUserId: z.number().int().optional(),
  Minutes: z.number().int().optional(),
});
