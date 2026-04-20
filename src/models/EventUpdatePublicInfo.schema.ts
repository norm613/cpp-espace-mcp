import { z } from "zod";

export const EventUpdatePublicInfoSchema = z.object({
  EventId: z.number().int().optional(),
  PublicLink: z.string().optional(),
  IsPublic: z.boolean().optional(),
  PublicNotes: z.string().optional(),
  ScheduleId: z.number().int().optional(),
});
