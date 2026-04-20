import { z } from "zod";

export const ApiInventoryItemInfoDtoSchema = z.object({
  Id: z.number().int().optional(),
  Name: z.string().optional(),
  Barcode: z.string().optional(),
  Price: z.number().optional(),
  VendorId: z.number().int().optional(),
  ItemTypeId: z.number().int().optional(),
  MinistryId: z.number().int().optional(),
  IsDeleted: z.boolean().optional(),
  ReorderThreshold: z.number().int().optional(),
  Aisle: z.string().optional(),
  Bin: z.string().optional(),
  VendorName: z.string().optional(),
  InventoryItemType: z.string().optional(),
  LocName: z.string().optional(),
  NotLocationRestricted: z.boolean().optional(),
  QtyOnHand: z.number().int().optional(),
  InventoryId: z.number().int().optional(),
  LocationId: z.number().int().optional(),
  Description: z.string().optional(),
});
