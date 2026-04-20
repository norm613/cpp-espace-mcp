import type { ApiInventoryItemInfoDto } from "./ApiInventoryItemInfoDto.js";
import type { ApiEquipmentInfoDto } from "./ApiEquipmentInfoDto.js";

export interface ApiInventoryGroupWithRelatedObjectsDto {
  InventoryItems?: ApiInventoryItemInfoDto[];
  Equipment?: ApiEquipmentInfoDto[];
  Id?: number;
  Name?: string;
  Description?: string;
  CreatedBy?: string;
  CreatedById?: number;
  CreatedOn?: string;
  UpdatedOn?: string;
}
