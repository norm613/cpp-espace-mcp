import { z } from "zod";

export const MinistryUserSchema = z.object({
  Id: z.number().int().optional(),
  FirstName: z.string().optional(),
  LastName: z.string().optional(),
  Email: z.string().optional(),
  Roles: z.array(z.string()).optional(),
});
