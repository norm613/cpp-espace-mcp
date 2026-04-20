import { z } from "zod";

export const VmWebhookEventSchema = z.object({
  Name: z.string().optional(),
  Id: z.number().int().optional(),
});
