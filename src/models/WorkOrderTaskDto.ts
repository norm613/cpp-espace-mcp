export interface WorkOrderTaskDto {
  Id?: number;
  AssignedTo?: string;
  CompletedBy?: string;
  Description?: string;
  DueDate?: string;
  IsCompleted?: boolean;
  DateCompleted?: string;
  TimeZone?: string;
  WorkOrderId?: number;
  TotalMinutes?: number;
  TotalCompletedMinutes?: number;
  AssignedToVendorId?: number;
  AssignedToVendorContactId?: number;
  AssignedToUserId?: number;
  AssignedToDepartmentId?: number;
  WorkOrderCostId?: number;
  TotalCompleteMinutesItemCost?: number;
  TotalEstimatedMinutesItemCost?: number;
}
