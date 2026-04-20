/** the work order add inventory cost input model */
export interface WorkOrderUpdateInventoryCostInputModel {
  /** the work order inventory id */
  InventoryId?: number;
  /** the quantity of the inventory item */
  Quantity?: number;
  /** the location idof the inventory item */
  LocationId?: number;
  /** the id of the work order cost. */
  Id?: number;
  /** the name of the cost */
  Name?: string;
  /** the notes about the cost amount */
  Note?: string;
}
