/** the Work Order Update Task Input Model */
export interface WorkOrderUpdateTaskInputModel {
  /** the user id that completed the task. */
  CompletedById?: number;
  /** the task description. */
  Description?: string;
  /** the due date of the task. */
  DueDate?: string;
  /** Flag to indicate if the task is completed. */
  IsCompleted?: boolean;
  /** the date the task was completed. */
  DateCompleted?: string;
  /** the work order id the task is assigned to. */
  WorkOrderId?: number;
  /** The estimated minutes to complete the task. */
  TotalMinutes?: number;
  /** The total completed minutes for the task. */
  TotalCompletedMinutes?: number;
  /** The vendor contact id assigned to the task. */
  AssignedToVendorContactId?: number;
  /** The user id assigned to the task. */
  AssignedToUserId?: number;
  /** The department id assigned to the task. */
  AssignedToDepartmentId?: number;
  /** The work order cost id the task is assigned to. */
  WorkOrderCostId?: number;
  /** The total estimated minutes for the item cost. */
  TotalEstimatedMinutesItemCost?: number;
  /** The total complete minutes for the item cost. */
  TotalCompleteMinutesItemCost?: number;
}
