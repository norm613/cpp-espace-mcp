/** the model for the input of the create maintenance endpoint */
export interface MaintenanceCreateTaskInputModel {
  /** the id of the task template to use */
  TaskTemplateId?: number;
  /** the description of the task */
  Description?: string;
  /** the id of the user to assign the task to */
  AssignedToUserId?: number;
  /** the priority of the task */
  Priority?: number;
  /** the estimated minutes the task will take to accomplish */
  TotalMinutes?: number;
}
