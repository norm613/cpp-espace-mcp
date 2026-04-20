/** The input model for creating a new equipment object. */
export interface EquipmentInputModel {
  /** The name of the equipment */
  Name: string;
  /** The equipment description */
  Description?: string;
  /** The equipment manufacturer */
  Manufacturer?: string;
  /** The equipment model */
  Model?: string;
  /** The equipment serial number */
  SerialNumber?: string;
  /** The date the equipment was put into service */
  DateInService?: string;
  /** The date the equipment parts warranty expires */
  WarrantyPartExpDate?: string;
  /** The date the equipment labor warranty expires */
  WarrantyLaborExpDate?: string;
  /** The service category id the equipment belongs to */
  ServiceCategoryIds?: number[];
  /** The location id the equipment belongs to */
  LocationId?: number;
  /** Flag indicating whether or not the equipment is deleted */
  IsDeleted?: boolean;
  /** Flag indicating whether or not the equipment is retired */
  IsRetired?: boolean;
  /** The date the equipment was retired from service */
  RetiredDate?: string;
  /** The space the equipment resides in */
  SpaceId?: number;
  /** The equipment identifier or barcode */
  EquipmentIdentifier?: string;
  /** the default document id for the equipment */
  DefaultDocumentId?: number;
  /** the equipment type id for the equipment */
  Type?: number;
  /** the type of tracking metric for the equipment */
  TrackingMetricType?: number;
  /** the current mileage for the equipment */
  CurrentMileage?: number;
  /** the current runtime minutes for the equipment */
  CurrentRuntimeMinutes?: number;
  /** the last time the metrics were updated for the equipment */
  LastMetricsUpdate?: string;
  /** The fuel type for the equipment */
  FuelType?: number;
  /** The custom fuel type for the equipment */
  CustomFuel?: string;
  /** the update frequency type for the equipment */
  UpdateFrequencyType?: number;
  /** the update frequency value for the equipment */
  UpdateFrequencyValue?: number;
}
