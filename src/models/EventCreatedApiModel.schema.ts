import { z } from "zod";

export const EventCreatedApiModelSchema = z.object({
  EventId: z.number().int().optional(),
  ScheduleId: z.number().int().optional(),
  ScheduleName: z.string().optional(),
  OccurrenceId: z.number().int().optional(),
  Status: z.string().optional(),
});
