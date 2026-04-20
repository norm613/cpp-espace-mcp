import { z } from "zod";

export const MinistryEventEditorSchema = z.object({
  Id: z.number().int().optional(),
  FirstName: z.string().optional(),
  LastName: z.string().optional(),
});
