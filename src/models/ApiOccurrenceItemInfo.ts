/** The info about the schedulable items of an occurrence */
export interface ApiOccurrenceItemInfo {
  /** The schedulable item id */
  ItemId?: number;
  /** The item type (Space/Resource/Service) */
  ItemType?: string;
  /** The name of the schedulable item */
  Name?: string;
  /** The qty requested for a inventoried resource */
  Qty?: number;
}
