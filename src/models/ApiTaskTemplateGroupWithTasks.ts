import type { ApiTaskTemplateInfoDto } from "./ApiTaskTemplateInfoDto.js";

export interface ApiTaskTemplateGroupWithTasks {
  Tasks?: ApiTaskTemplateInfoDto[];
  Id?: number;
  Name?: string;
  CreatedOn?: string;
}
