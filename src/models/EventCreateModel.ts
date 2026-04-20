/** Represents an Event */
export interface EventCreateModel {
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
  Categories?: number[];
  AutoApprove?: boolean;
  OwnerId?: number;
  PublicNotes?: string;
  PublicLink?: string;
  Locations?: number[];
  PublicLocations?: number[];
  IsOffSite?: boolean;
  OffsiteLocation?: string;
  EditorIds?: number[];
  ScheduleId?: number;
  EventId?: number;
}
