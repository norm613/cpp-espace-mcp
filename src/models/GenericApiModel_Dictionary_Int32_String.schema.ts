import { z } from "zod";

export const GenericApiModel_Dictionary_Int32_StringSchema = z.object({
  IsSuccessStatusCode: z.boolean().optional(),
  Message: z.string().optional(),
  Data: z.unknown().optional(),
  IsUsingShelbyArenaAdvancedIntegration: z.boolean().optional(),
});
