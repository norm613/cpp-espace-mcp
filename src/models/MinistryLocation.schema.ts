import { z } from "zod";

export const MinistryLocationSchema = z.object({
  Id: z.number().int().optional(),
  Name: z.string().optional(),
  LocationCode: z.string().optional(),
});
