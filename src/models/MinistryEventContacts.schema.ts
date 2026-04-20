import { z } from "zod";

export const MinistryEventContactsSchema = z.object({
  Id: z.number().int().optional(),
  FirstName: z.string().optional(),
  LastName: z.string().optional(),
  Email: z.string().optional(),
  Phone: z.string().optional(),
  Company: z.string().optional(),
  ContactId: z.number().int().optional(),
});
