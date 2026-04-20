import type { InventoryRequestItemDto } from "./InventoryRequestItemDto.js";

export interface ApiInventoryRequestDto {
  Id?: number;
  RequestNumber?: number;
  Comments?: string;
  Status?: "Draft" | "Submitted" | "Accepted" | "Completed" | "Declined" | "InProgress";
  RequestedById?: number;
  RequestedByFullName?: string;
  RequestedDate?: string;
  ApprovedById?: number;
  ApprovedByFullName?: string;
  ApprovedDate?: string;
  AssignedToId?: number;
  AssignedToFullName?: string;
  StartedById?: number;
  StartedByFullName?: string;
  StartedDate?: string;
  CompletedById?: number;
  CompletedByFullName?: string;
  CompletedDate?: string;
  WorkTime?: number;
  RequestedItems?: InventoryRequestItemDto[];
}
