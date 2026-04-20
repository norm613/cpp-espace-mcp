import { z } from "zod";
import { ApiItemInfoSchema } from "./ApiItemInfo.schema.js";
import { ApiWorkOrderCostDTOSchema } from "./ApiWorkOrderCostDTO.schema.js";
import { WorkOrderTaskDtoSchema } from "./WorkOrderTaskDto.schema.js";
import { ApiDocumentInfoSchema } from "./ApiDocumentInfo.schema.js";

export const ApiWorkOrderInfoSchema = z.object({
  Id: z.number().int().optional(),
  WorkOrderNumber: z.number().int().optional(),
  ShortDescription: z.string().optional(),
  FullDescription: z.string().optional(),
  LocationName: z.string().optional(),
  LocationId: z.number().int().optional(),
  SpaceNames: z.string().optional(),
  ServiceCategory: z.string().optional(),
  ServiceCategoryId: z.number().int().optional(),
  StatusId: z.number().int().optional(),
  Status: z.string().optional(),
  Priority: z.string().optional(),
  Eta: z.string().datetime().or(z.string()).optional(),
  EtaDisplay: z.string().optional(),
  AssignedId: z.number().int().optional(),
  AssignedTo: z.string().optional(),
  VendorAssignedName: z.string().optional(),
  VendorAssignedId: z.number().int().optional(),
  VendorContactId: z.number().int().optional(),
  AssignedDepartmentId: z.number().int().optional(),
  HasSpaces: z.boolean().optional(),
  Spaces: z.array(ApiItemInfoSchema).optional(),
  HasCosts: z.boolean().optional(),
  Costs: z.array(ApiWorkOrderCostDTOSchema).optional(),
  HasTasks: z.boolean().optional(),
  Tasks: z.array(WorkOrderTaskDtoSchema).optional(),
  HasAttachments: z.boolean().optional(),
  Attachments: z.array(ApiDocumentInfoSchema).optional(),
});
