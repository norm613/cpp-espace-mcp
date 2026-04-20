/** The input model for creating a new scheduled maintenance object. */
export interface MaintenanceUpdateInputModel {
  /** The id of the maintenance to update. */
  MaintenanceId: number;
  /** the service category id for the maintenance */
  ServiceCategoryId?: number;
  /** the location id for the maintenance */
  LocationId?: number;
  /** the maintenance type id for the maintenance */
  MaintenanceType?: number;
  /** the vendor who should be assigned to the maintenance. */
  VendorAssignedId?: number;
  /** The vendor contact that should be assigned to the scheduled maintenance. */
  AssignedVendorContactId?: number;
  /** Notes about the scheduled maintenance. */
  Notes?: string;
  /** The date the scheduled maintenance should start. */
  StartDate?: string;
  /** The date the scheduled maintenance should end. */
  EndDate?: string;
  /** The description of the scheduled maintenance. */
  Description: string;
  /** The ministry user assigned to the scheduled maintenance. */
  AssignedUserId?: number;
  /** The department assigned to the scheduled maintenance. */
  AssignedDepartmentId?: number;
  /** The lead time for the work order to be generated. */
  XDaysAfterGenerated?: number;
  /** A flag to determine whether this scheduled maintenance should recur. Default true. */
  IsRecurring?: boolean;
  /** Number of days prior to the scheduled maintenance that a work order should be created. */
  XDaysPriorToCreateWo?: number;
  /** A semaphore flag to determine who the scheduled maintenance reminder should be sent to. */
  ReminderType?: number;
  /** The number of days prior to the scheduled maintenance that a reminder should be sent. */
  ReminderInDays?: number;
  /** The date the next reminder should be sent. */
  NextReminderDate?: string;
  /** The note to be included in the reminder. */
  ReminderText?: string;
  /** The date the scheduled maintenance work order should be generated. */
  NextScheduledTime?: string;
  /** The number of frequency units for the scheduled maintenance. */
  Frequency?: number;
  /** The frequency type id for the scheduled maintenance. */
  FrequencyTypeId?: number;
  /** The list of custom dates for the scheduled maintenance. */
  CustomDates?: string[];
  /** Flag indicating whether the next scheduled maintenance should be generated based on the last completed date or on the last generated date. */
  GenerateNextDateBasedOnLastCompleted?: boolean;
  /** Flag indicating whether work orders genereated because of this schedule require approval after completion. */
  RequiresApprovalAfterCompletion?: boolean;
  /** Flag indicating whether a new work order should be created if the previous work order is not complete. */
  PreventNewWoFromBeingCreatedIfPreviousIsNotComplete?: boolean;
  /** The beginning run time counter for scheduled maintenance. */
  StartRunTimeMinutes?: number;
  /** The threshold for generating work orders based on minutes. */
  ThresholdRunTimeMinutes?: number;
  /** The repeat run time minutes for generating a work order */
  RepeatRunTimeMinutes?: number;
  /** The next scheduled run time minutes for generating a work order. */
  NextScheduledRunTimeMinutes?: number;
  /** The start mileage for the scheduled maintenance. */
  StartMileage?: number;
  /** The threshold mileage for generating a work order. */
  ThresholdMileage?: number;
  /** The repeat mileage for generating a work order. */
  RepeatMileage?: number;
  /** The next scheduled mileage for generating a work order. */
  NextScheduledMileage?: number;
}
