import { z } from "zod";

export const ServiceCategoryDtoSchema = z.object({
  Id: z.number().int().optional(),
  Name: z.string().optional(),
  MinistryId: z.number().int().optional(),
  SystemSpecification: z.string().optional(),
  IsDeleted: z.boolean().optional(),
});
