import { z } from "zod";
import { ServiceCategoryDtoSchema } from "./ServiceCategoryDto.schema.js";

export const GetServiceCategoriesResponseSchema = z.object({
  ServiceCategories: z.array(ServiceCategoryDtoSchema).optional(),
  Success: z.boolean().optional(),
  Message: z.string().optional(),
});
