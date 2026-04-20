/** the model for the output of the delete maintenance endpoint */
export interface MaintenanceDeleteOutputModel {
  /** the id of the maintenance that was deleted */
  maintenanceId?: number;
  /** the message to be displayed to the user */
  message?: string;
}
