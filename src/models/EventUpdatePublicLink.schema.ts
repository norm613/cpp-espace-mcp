import { z } from "zod";

export const EventUpdatePublicLinkSchema = z.object({
  EventId: z.number().int().optional(),
  PublicLink: z.string().optional(),
  IsPublic: z.boolean().optional(),
  ScheduleId: z.number().int().optional(),
});
