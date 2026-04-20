import { z } from "zod";

export const ApiWorkOrderCostDTOSchema = z.object({
  Id: z.number().int().optional(),
  Quantity: z.number().int().optional(),
  UnitPrice: z.number().optional(),
  EstimatedLaborCost: z.number().optional(),
  EstimatedMaterialsCost: z.number().optional(),
  ActualLaborCost: z.number().optional(),
  ActualMaterialsCosts: z.number().optional(),
  ItemName: z.string().optional(),
  WorkOrderEquipmentId: z.number().int().optional(),
  WorkOrderInventoryId: z.number().int().optional(),
  WorkOrderNumber: z.number().int().optional(),
  CostTypeDisplay: z.string().optional(),
  MemberId: z.number().int().optional(),
  MemberFullName: z.string().optional(),
  DateOfWork: z.string().datetime().or(z.string()).optional(),
  VendorName: z.string().optional(),
  VendorId: z.number().int().optional(),
  TotalCompletedMinutes: z.number().int().optional(),
  TotalCompletedHoursToDisplay: z.string().optional() /* readOnly */,
});
