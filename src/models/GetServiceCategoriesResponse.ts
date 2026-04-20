import type { ServiceCategoryDto } from "./ServiceCategoryDto.js";

export interface GetServiceCategoriesResponse {
  ServiceCategories?: ServiceCategoryDto[];
  Success?: boolean;
  Message?: string;
}
