import { z } from "zod";

export const ApiScheduledMaintenanceTaskSchema = z.object({
  Id: z.number().int().optional(),
  Description: z.string().optional(),
  IsCompleted: z.boolean().optional(),
  AssignedById: z.number().int().optional(),
  AssignedBy: z.string().optional(),
  AssignedToUserId: z.number().int().optional(),
  AssignedToUser: z.string().optional(),
});
