/** the work order add inventory cost input model */
export interface WorkOrderAddInventoryCostInputModel {
  /** the work order inventory id */
  InventoryId?: number;
  /** the quantity of the inventory used by the work order */
  Quantity?: number;
  /** the location idof the inventory item */
  LocationId?: number;
  /** the name of the cost */
  Name?: string;
  /** the notes about the cost amount */
  Note?: string;
  /** the date the cost was created */
  CreationDate?: string;
}
