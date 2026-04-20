/** The Work Order Add Task Input Model */
export interface WorkOrderAddTaskInputModel {
  /** The task description.4 */
  Description?: string;
  /** The due date of the task. */
  DueDate?: string;
  /** Total estimated minutes for the task */
  TotalMinutes?: number;
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
}
