export interface ApiEquipmentInfoDto {
  Id?: number;
  Name?: string;
  Barcode?: string;
  Description?: string;
  Manfacturer?: string;
  Model?: string;
  SerialNumber?: string;
  DateInService?: string;
  WarrantyPartExpDate?: string;
  WarrantyLaborExpDate?: string;
  RetiredDate?: string;
  SpaceId?: number;
  SpaceName?: string;
  ServiceCategoryName?: string;
  LocationId?: number;
  LocationName?: string;
  Type?: "Equipment" | "Vehicle";
  TrackingMetricType?: "Mileage" | "RuntimeHours";
  readonly IsVehicle?: boolean;
}
