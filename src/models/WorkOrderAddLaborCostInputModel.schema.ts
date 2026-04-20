import { z } from "zod";

export const WorkOrderAddLaborCostInputModelSchema = z.object({
  DateOfWork: z.string().datetime().or(z.string()).optional(),
  MemberId: z.number().int(),
  Minutes: z.number().int(),
  HourlyRate: z.number().optional(),
  DescriptionOfWork: z.string().optional(),
  Name: z.string().optional(),
  Note: z.string().optional(),
  CreationDate: z.string().datetime().or(z.string()).optional(),
});
