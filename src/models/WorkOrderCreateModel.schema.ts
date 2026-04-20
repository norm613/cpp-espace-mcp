import { z } from "zod";

export const WorkOrderCreateModelSchema = z.object({
  FullDescription: z.string(),
  LocationId: z.number().int(),
  ServiceCategoryId: z.number().int(),
  PriorityId: z.number().int(),
  Eta: z.string().datetime().or(z.string()).optional(),
  AssignedId: z.number().int().optional(),
  VendorAssignedId: z.number().int().optional(),
  VendorContactId: z.number().int().optional(),
  AssignedDepartmentId: z.number().int().optional(),
});
