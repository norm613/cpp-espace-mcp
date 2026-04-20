import { z } from "zod";

export const ApiDocumentInfoSchema = z.object({
  Id: z.number().int().optional(),
  Title: z.string().optional(),
  FileName: z.string().optional(),
  Uri: z.string().optional() /* readOnly */,
});
