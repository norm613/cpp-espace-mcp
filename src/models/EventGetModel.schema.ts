import { z } from "zod";
import { MinistryEventCategorySchema } from "./MinistryEventCategory.schema.js";
import { MinistryLocationSchema } from "./MinistryLocation.schema.js";
import { MinistryEventEditorSchema } from "./MinistryEventEditor.schema.js";
import { MinistryEventContactsSchema } from "./MinistryEventContacts.schema.js";

export const EventGetModelSchema = z.object({
  EventName: z.string(),
  Description: z.string().optional(),
  SetupStartDate: z.string().datetime().or(z.string()).optional(),
  SetupStartTime: z.string().optional(),
  EventDate: z.string().datetime().or(z.string()),
  StartTime: z.string().optional(),
  EventEndDate: z.string().datetime().or(z.string()).optional(),
  EndTime: z.string().optional(),
  TeardownEndDate: z.string().datetime().or(z.string()).optional(),
  TearDownEndTime: z.string().optional(),
  AdditionalDates: z.array(z.string().datetime().or(z.string())).optional(),
  IsPublic: z.boolean().optional(),
  NumOfPeople: z.number().int().optional(),
  IsAllDayEvent: z.boolean().optional(),
  IsMultiDayEvent: z.boolean().optional(),
  Categories: z.array(MinistryEventCategorySchema).optional(),
  AutoApprove: z.boolean().optional(),
  OwnerId: z.number().int().optional(),
  PublicNotes: z.string().optional(),
  PublicHtmlNotes: z.string().optional(),
  PublicLink: z.string().optional(),
  Locations: z.array(MinistryLocationSchema).optional(),
  PublicLocations: z.array(MinistryLocationSchema).optional(),
  IsOffSite: z.boolean().optional(),
  OffsiteLocation: z.string().optional(),
  Editors: z.array(MinistryEventEditorSchema).optional(),
  ScheduleId: z.number().int().optional(),
  ScheduleName: z.string().optional(),
  EventId: z.number().int().optional(),
  Status: z.string().optional(),
  PublicCalendarImageUrl: z.string().optional(),
  Contacts: z.array(MinistryEventContactsSchema).optional(),
  IsFinalApproved: z.boolean().optional(),
  EventScheduleIds: z.string().optional(),
  EventScheduleNames: z.string().optional(),
  SpacesOnPublicCalendarDisplay: z.string().optional(),
});
