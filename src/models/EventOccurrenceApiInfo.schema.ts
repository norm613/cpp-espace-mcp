import { z } from "zod";
import { ApiOccurrenceItemInfoSchema } from "./ApiOccurrenceItemInfo.schema.js";
import { MinistryEventContactsSchema } from "./MinistryEventContacts.schema.js";

export const EventOccurrenceApiInfoSchema = z.object({
  OccurrenceId: z.number().int().optional(),
  SetUpStart: z.string().datetime().or(z.string()).optional(),
  EventStart: z.string().datetime().or(z.string()).optional(),
  EventEnd: z.string().datetime().or(z.string()).optional(),
  TearDownEnd: z.string().datetime().or(z.string()).optional(),
  IsAllDay: z.boolean().optional(),
  OccurrenceStatus: z.string().optional(),
  Items: z.array(ApiOccurrenceItemInfoSchema).optional(),
  EventName: z.string().optional(),
  EventId: z.number().int().optional(),
  ScheduleId: z.number().int().optional(),
  ScheduleName: z.string().optional(),
  EventStatus: z.string().optional(),
  PublicCalendarImageUrl: z.string().optional(),
  IsPublic: z.boolean().optional(),
  PublicNotes: z.string().optional(),
  PublicHtmlNotes: z.string().optional(),
  Contacts: z.array(MinistryEventContactsSchema).optional(),
  IsFinalApproved: z.boolean().optional(),
  PublicLink: z.string().optional(),
});
