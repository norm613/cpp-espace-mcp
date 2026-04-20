import { z } from "zod";
import { ApiInventoryItemInfoDtoSchema } from "./ApiInventoryItemInfoDto.schema.js";
import { ApiEquipmentInfoDtoSchema } from "./ApiEquipmentInfoDto.schema.js";

export const ApiInventoryGroupWithRelatedObjectsDtoSchema = z.object({
  InventoryItems: z.array(ApiInventoryItemInfoDtoSchema).optional(),
  Equipment: z.array(ApiEquipmentInfoDtoSchema).optional(),
  Id: z.number().int().optional(),
  Name: z.string().optional(),
  Description: z.string().optional(),
  CreatedBy: z.string().optional(),
  CreatedById: z.number().int().optional(),
  CreatedOn: z.string().datetime().or(z.string()).optional(),
  UpdatedOn: z.string().datetime().or(z.string()).optional(),
});
