import { z } from "zod";

// Self-referencing type — use z.lazy() for recursive Children array
export const MobileTreeNodeSchema: z.ZodType<Record<string, unknown>> = z.object({
  ItemId: z.number().int().optional(),
  ParentId: z.number().int().optional(),
  IsSchedulable: z.boolean().optional(),
  HasScheduledChildren: z.boolean().optional(),
  ChildrenIds: z.string().optional(),
  IsScheduled: z.boolean().optional(),
  HasSchedualbleChildren: z.boolean().optional(),
  LocCode: z.string().optional(),
  Capacity: z.number().int().optional(),
  Name: z.string().optional(),
  Children: z.array(z.lazy(() => MobileTreeNodeSchema)).optional(),
  HasChildren: z.boolean().optional(),
  IsDraftConflicted: z.boolean().optional(),
  IsInventoriedItem: z.boolean().optional(),
  CurrentQtyOnHand: z.number().int().optional(),
  OriginalQty: z.number().int().optional(),
  ShortageCount: z.number().int().optional(),
  ItemType: z.string().optional(),
  IsAvailabilityScheduleConflicted: z.boolean().optional(),
  IsClosureConflicted: z.boolean().optional(),
});
