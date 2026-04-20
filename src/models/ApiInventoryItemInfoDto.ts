export interface ApiInventoryItemInfoDto {
  Id?: number;
  Name?: string;
  Barcode?: string;
  Price?: number;
  VendorId?: number;
  ItemTypeId?: number;
  MinistryId?: number;
  IsDeleted?: boolean;
  ReorderThreshold?: number;
  Aisle?: string;
  Bin?: string;
  VendorName?: string;
  InventoryItemType?: string;
  LocName?: string;
  NotLocationRestricted?: boolean;
  QtyOnHand?: number;
  InventoryId?: number;
  LocationId?: number;
  Description?: string;
}
