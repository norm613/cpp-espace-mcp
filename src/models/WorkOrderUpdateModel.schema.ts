import { z } from "zod";

export const WorkOrderUpdateModelSchema = z.object({
  WorkOrderId: z.number().int(),
  FullDescription: z.string().optional(),
  LocationId: z.number().int().optional(),
  ServiceCategoryId: z.number().int().optional(),
  PriorityId: z.number().int().optional(),
  StatusId: z.number().int().optional(),
  Eta: z.string().datetime().or(z.string()).optional(),
  AssignedId: z.number().int().optional(),
  VendorAssignedId: z.number().int().optional(),
  VendorContactId: z.number().int().optional(),
  AssignedDepartmentId: z.number().int().optional(),
});
