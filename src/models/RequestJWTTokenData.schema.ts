import { z } from "zod";

export const RequestJWTTokenDataSchema = z.object({
  apiKey: z.string().optional(),
});
