import { z } from "zod";
import { InventoryRequestItemDtoSchema } from "./InventoryRequestItemDto.schema.js";

export const ApiInventoryRequestDtoSchema = z.object({
  Id: z.number().int().optional(),
  RequestNumber: z.number().int().optional(),
  Comments: z.string().optional(),
  Status: z.enum(["Draft", "Submitted", "Accepted", "Completed", "Declined", "InProgress"]).optional(),
  RequestedById: z.number().int().optional(),
  RequestedByFullName: z.string().optional(),
  RequestedDate: z.string().datetime().or(z.string()).optional(),
  ApprovedById: z.number().int().optional(),
  ApprovedByFullName: z.string().optional(),
  ApprovedDate: z.string().datetime().or(z.string()).optional(),
  AssignedToId: z.number().int().optional(),
  AssignedToFullName: z.string().optional(),
  StartedById: z.number().int().optional(),
  StartedByFullName: z.string().optional(),
  StartedDate: z.string().datetime().or(z.string()).optional(),
  CompletedById: z.number().int().optional(),
  CompletedByFullName: z.string().optional(),
  CompletedDate: z.string().datetime().or(z.string()).optional(),
  WorkTime: z.number().int().optional(),
  RequestedItems: z.array(InventoryRequestItemDtoSchema).optional(),
});
