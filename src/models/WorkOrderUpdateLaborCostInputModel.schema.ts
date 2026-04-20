import { z } from "zod";

export const WorkOrderUpdateLaborCostInputModelSchema = z.object({
  DateOfWork: z.string().datetime().or(z.string()).optional(),
  MemberId: z.number().int().optional(),
  EstimatedLaborCost: z.number().optional(),
  HourlyRate: z.number().optional(),
  DescriptionOfWork: z.string().optional(),
  Id: z.number().int().optional(),
  Name: z.string().optional(),
  Note: z.string().optional(),
});
