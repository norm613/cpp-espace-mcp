import { z } from "zod";

export const ApiEquipmentInfoDtoSchema = z.object({
  Id: z.number().int().optional(),
  Name: z.string().optional(),
  Barcode: z.string().optional(),
  Description: z.string().optional(),
  Manfacturer: z.string().optional(),
  Model: z.string().optional(),
  SerialNumber: z.string().optional(),
  DateInService: z.string().datetime().or(z.string()).optional(),
  WarrantyPartExpDate: z.string().datetime().or(z.string()).optional(),
  WarrantyLaborExpDate: z.string().datetime().or(z.string()).optional(),
  RetiredDate: z.string().datetime().or(z.string()).optional(),
  SpaceId: z.number().int().optional(),
  SpaceName: z.string().optional(),
  ServiceCategoryName: z.string().optional(),
  LocationId: z.number().int().optional(),
  LocationName: z.string().optional(),
  Type: z.enum(["Equipment", "Vehicle"]).optional(),
  TrackingMetricType: z.enum(["Mileage", "RuntimeHours"]).optional(),
  IsVehicle: z.boolean().optional() /* readOnly */,
});
