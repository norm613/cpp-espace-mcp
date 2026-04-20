import { z } from "zod";

export const EquipmentDeleteOutputModelSchema = z.object({
  EquipmentId: z.number().int().optional(),
  Status: z.string().optional(),
});
