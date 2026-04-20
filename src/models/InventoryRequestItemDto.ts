export interface InventoryRequestItemDto {
  Id?: number;
  InventoryItemId?: number;
  ItemTypeId?: number;
  InventoryItemName?: string;
  InventoryItemAisle?: string;
  InventoryItemBin?: string;
  InventoryItemTypeName?: string;
  FromLocationId?: number;
  ToLocationId?: number;
  ToLocationName?: string;
  FromLocationName?: string;
  Quantity?: number;
  QuantityOnHand?: number;
  QuantityPending?: number;
  RequestedQuantity?: number;
  HasImagesOrBarcode?: boolean;
  ItemNumber?: string;
  AvailableQuantity?: number;
  InventoryRequestStatus?: "Draft" | "Submitted" | "Accepted" | "Completed" | "Declined" | "InProgress";
  UnitCost?: number;
}
