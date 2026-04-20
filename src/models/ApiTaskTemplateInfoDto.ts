export interface ApiTaskTemplateInfoDto {
  Id?: number;
  Description?: string;
  ServiceCategories?: string;
  GroupNames?: string;
  TaskOrderIndex?: number;
  Minutes?: number;
  readonly HoursToDisplay?: string;
}
