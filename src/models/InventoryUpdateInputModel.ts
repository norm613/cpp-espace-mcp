/** The input model for updating an inventory item. */
export interface InventoryUpdateInputModel {
  /** the location id */
  LocationId: number;
  /** the quantity of the inventory item */
  Quantity: number;
  /** the note to be stored for the inventory adjustment */
  AdjustmentNote?: string;
}
