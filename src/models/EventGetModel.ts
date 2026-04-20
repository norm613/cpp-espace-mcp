import type { MinistryEventCategory } from "./MinistryEventCategory.js";
import type { MinistryLocation } from "./MinistryLocation.js";
import type { MinistryEventEditor } from "./MinistryEventEditor.js";
import type { MinistryEventContacts } from "./MinistryEventContacts.js";

/** Represents an Event */
export interface EventGetModel {
  EventName: string;
  Description?: string;
  SetupStartDate?: string;
  SetupStartTime?: string;
  EventDate: string;
  StartTime?: string;
  EventEndDate?: string;
  EndTime?: string;
  TeardownEndDate?: string;
  TearDownEndTime?: string;
  AdditionalDates?: string[];
  IsPublic?: boolean;
  NumOfPeople?: number;
  IsAllDayEvent?: boolean;
  IsMultiDayEvent?: boolean;
  Categories?: MinistryEventCategory[];
  AutoApprove?: boolean;
  OwnerId?: number;
  PublicNotes?: string;
  PublicHtmlNotes?: string;
  PublicLink?: string;
  Locations?: MinistryLocation[];
  PublicLocations?: MinistryLocation[];
  IsOffSite?: boolean;
  OffsiteLocation?: string;
  Editors?: MinistryEventEditor[];
  ScheduleId?: number;
  ScheduleName?: string;
  EventId?: number;
  Status?: string;
  PublicCalendarImageUrl?: string;
  Contacts?: MinistryEventContacts[];
  IsFinalApproved?: boolean;
  EventScheduleIds?: string;
  EventScheduleNames?: string;
  SpacesOnPublicCalendarDisplay?: string;
}
