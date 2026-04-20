import { z } from "zod";

export const InventoryRequestItemDtoSchema = z.object({
  Id: z.number().int().optional(),
  InventoryItemId: z.number().int().optional(),
  ItemTypeId: z.number().int().optional(),
  InventoryItemName: z.string().optional(),
  InventoryItemAisle: z.string().optional(),
  InventoryItemBin: z.string().optional(),
  InventoryItemTypeName: z.string().optional(),
  FromLocationId: z.number().int().optional(),
  ToLocationId: z.number().int().optional(),
  ToLocationName: z.string().optional(),
  FromLocationName: z.string().optional(),
  Quantity: z.number().int().optional(),
  QuantityOnHand: z.number().int().optional(),
  QuantityPending: z.number().int().optional(),
  RequestedQuantity: z.number().int().optional(),
  HasImagesOrBarcode: z.boolean().optional(),
  ItemNumber: z.string().optional(),
  AvailableQuantity: z.number().int().optional(),
  InventoryRequestStatus: z.enum(["Draft", "Submitted", "Accepted", "Completed", "Declined", "InProgress"]).optional(),
  UnitCost: z.number().optional(),
});
