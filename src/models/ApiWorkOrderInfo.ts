import type { ApiItemInfo } from "./ApiItemInfo.js";
import type { ApiWorkOrderCostDTO } from "./ApiWorkOrderCostDTO.js";
import type { WorkOrderTaskDto } from "./WorkOrderTaskDto.js";
import type { ApiDocumentInfo } from "./ApiDocumentInfo.js";

export interface ApiWorkOrderInfo {
  Id?: number;
  WorkOrderNumber?: number;
  ShortDescription?: string;
  FullDescription?: string;
  LocationName?: string;
  LocationId?: number;
  SpaceNames?: string;
  ServiceCategory?: string;
  ServiceCategoryId?: number;
  StatusId?: number;
  Status?: string;
  Priority?: string;
  Eta?: string;
  EtaDisplay?: string;
  AssignedId?: number;
  AssignedTo?: string;
  VendorAssignedName?: string;
  VendorAssignedId?: number;
  VendorContactId?: number;
  AssignedDepartmentId?: number;
  HasSpaces?: boolean;
  Spaces?: ApiItemInfo[];
  HasCosts?: boolean;
  Costs?: ApiWorkOrderCostDTO[];
  HasTasks?: boolean;
  Tasks?: WorkOrderTaskDto[];
  HasAttachments?: boolean;
  Attachments?: ApiDocumentInfo[];
}
