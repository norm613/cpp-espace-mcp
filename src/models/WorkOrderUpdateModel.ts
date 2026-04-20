/** Work order update model. */
export interface WorkOrderUpdateModel {
  /** Required. The id of the work order. */
  WorkOrderId: number;
  /** The full description of the work order. */
  FullDescription?: string;
  /** The location id of the work order. */
  LocationId?: number;
  /** The service category id of the work order. */
  ServiceCategoryId?: number;
  /** The priority of the work order. */
  PriorityId?: number;
  /** The status of the work order. */
  StatusId?: number;
  /** The requested completion date of the work order. */
  Eta?: string;
  /** The user assigned to the work order. */
  AssignedId?: number;
  /** The vender assigned to the work order. */
  VendorAssignedId?: number;
  /** The contact id of the vendor assigned to the work order. */
  VendorContactId?: number;
  /** The department id assigned to the work order. */
  AssignedDepartmentId?: number;
}
