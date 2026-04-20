import { z } from "zod";
import { ApiDocumentInfoSchema } from "./ApiDocumentInfo.schema.js";
import { ApiItemInfoSchema } from "./ApiItemInfo.schema.js";
import { ApiEquipmentInfoDtoSchema } from "./ApiEquipmentInfoDto.schema.js";
import { ApiScheduledMaintenanceTaskSchema } from "./ApiScheduledMaintenanceTask.schema.js";
import { ApiWorkOrderInfoSchema } from "./ApiWorkOrderInfo.schema.js";

export const ApiScheduledMaintenanceSchema = z.object({
  Id: z.number().int().optional(),
  ServiceCategoryId: z.number().int().optional(),
  ServiceCategory: z.string().optional(),
  LocationId: z.number().int().optional(),
  LocationName: z.string().optional(),
  Notes: z.string().optional(),
  StartDate: z.string().datetime().or(z.string()).optional(),
  EndDate: z.string().datetime().or(z.string()).optional(),
  Description: z.string().optional(),
  AssignedId: z.number().int().optional(),
  VendorAssignedName: z.string().optional(),
  VendorAssignedId: z.number().int().optional(),
  VendorContactId: z.number().int().optional(),
  AssignedDepartmentId: z.number().int().optional(),
  AssignedTo: z.string().optional(),
  FrequencyDays: z.number().int().optional(),
  Frequency: z.string().optional(),
  CustomDates: z.string().optional(),
  WOLeadTime: z.number().int().optional(),
  RemindAllAdmins: z.boolean().optional(),
  RemindAssigned: z.boolean().optional(),
  RemindUser: z.boolean().optional(),
  ReminderDaysLeadTime: z.number().int().optional(),
  ReminderNote: z.string().optional(),
  RequiresApprovalAfterCompletion: z.boolean().optional(),
  HasAttachments: z.boolean().optional(),
  Attachments: z.array(ApiDocumentInfoSchema).optional(),
  HasSpaces: z.boolean().optional(),
  Spaces: z.array(ApiItemInfoSchema).optional(),
  HasEquipment: z.boolean().optional(),
  Equipment: z.array(ApiEquipmentInfoDtoSchema).optional(),
  HasTasks: z.boolean().optional(),
  Tasks: z.array(ApiScheduledMaintenanceTaskSchema).optional(),
  HasWorkOrders: z.boolean().optional(),
  WorkOrders: z.array(ApiWorkOrderInfoSchema).optional(),
});
