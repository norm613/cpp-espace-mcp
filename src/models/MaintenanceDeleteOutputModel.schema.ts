import { z } from "zod";

export const MaintenanceDeleteOutputModelSchema = z.object({
  maintenanceId: z.number().int().optional(),
  message: z.string().optional(),
});
