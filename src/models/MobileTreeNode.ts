/** Represents a leaf of the Event/Space Tree */
export interface MobileTreeNode {
  /** The Space Id */
  ItemId?: number;
  ParentId?: number;
  IsSchedulable?: boolean;
  HasScheduledChildren?: boolean;
  ChildrenIds?: string;
  IsScheduled?: boolean;
  HasSchedualbleChildren?: boolean;
  LocCode?: string;
  Capacity?: number;
  Name?: string;
  Children?: MobileTreeNode[];
  HasChildren?: boolean;
  IsDraftConflicted?: boolean;
  IsInventoriedItem?: boolean;
  CurrentQtyOnHand?: number;
  OriginalQty?: number;
  ShortageCount?: number;
  ItemType?: string;
  IsAvailabilityScheduleConflicted?: boolean;
  IsClosureConflicted?: boolean;
}
