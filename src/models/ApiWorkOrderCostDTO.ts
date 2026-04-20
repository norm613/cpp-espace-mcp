export interface ApiWorkOrderCostDTO {
  Id?: number;
  Quantity?: number;
  UnitPrice?: number;
  EstimatedLaborCost?: number;
  EstimatedMaterialsCost?: number;
  ActualLaborCost?: number;
  ActualMaterialsCosts?: number;
  ItemName?: string;
  WorkOrderEquipmentId?: number;
  WorkOrderInventoryId?: number;
  WorkOrderNumber?: number;
  CostTypeDisplay?: string;
  MemberId?: number;
  MemberFullName?: string;
  DateOfWork?: string;
  VendorName?: string;
  VendorId?: number;
  TotalCompletedMinutes?: number;
  readonly TotalCompletedHoursToDisplay?: string;
}
