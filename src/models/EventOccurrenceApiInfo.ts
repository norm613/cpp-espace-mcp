import type { ApiOccurrenceItemInfo } from "./ApiOccurrenceItemInfo.js";
import type { MinistryEventContacts } from "./MinistryEventContacts.js";

/** Occurrences for an event */
export interface EventOccurrenceApiInfo {
  /** The occurrence id */
  OccurrenceId?: number;
  /** Setup date/time for occurrence */
  SetUpStart?: string;
  /** Occurrence Start */
  EventStart?: string;
  /** Occurrence End */
  EventEnd?: string;
  /** Teardown date/time for occurrence */
  TearDownEnd?: string;
  /** Denotes if occurrence is all-day */
  IsAllDay?: boolean;
  /** The occurrence status */
  OccurrenceStatus?: string;
  Items?: ApiOccurrenceItemInfo[];
  /** The event name */
  EventName?: string;
  /** The event id */
  EventId?: number;
  /** The schedule id */
  ScheduleId?: number;
  /** The schedule name */
  ScheduleName?: string;
  /** The status of the event */
  EventStatus?: string;
  /** The public image of the event */
  PublicCalendarImageUrl?: string;
  IsPublic?: boolean;
  PublicNotes?: string;
  PublicHtmlNotes?: string;
  Contacts?: MinistryEventContacts[];
  IsFinalApproved?: boolean;
  PublicLink?: string;
}
