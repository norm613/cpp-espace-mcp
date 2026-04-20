import { z } from "zod";
import { VmWebhookEventSchema } from "./VmWebhookEvent.schema.js";

export const VmWebhookSubscripotionSchema = z.object({
  Id: z.number().int().optional(),
  Url: z.string(),
  Notes: z.string().optional(),
  Events: z.array(VmWebhookEventSchema).optional(),
});
