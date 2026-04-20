import { z } from "zod";

export const WebHookCreateApiModelSchema = z.object({
  Id: z.number().int().optional(),
  Url: z.string(),
  Notes: z.string().optional(),
  EventIds: z.array(z.number().int()).optional(),
});
