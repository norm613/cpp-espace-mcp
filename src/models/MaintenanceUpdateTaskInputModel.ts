/** The model for the input of the update maintenance endpoint */
export interface MaintenanceUpdateTaskInputModel {
  /** The id of the scheduled maintenance that this task applies to */
  ScheduledMaintenanceId?: number;
  /** The description of the task */
  Description?: string;
  /** Flag indicating if the task is completed */
  IsCompleted?: boolean;
  /** The priority of the task */
  Priority?: number;
  /** The id of the user to assign the task to */
  AssignedToUserId?: number;
  /** The estimated minutes the task will take to accomplish */
  Minutes?: number;
}
