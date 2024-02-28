import { z } from "zod";

export const CategoryTagModelSchema = z.object({});

export const CategoryTagSampleModelSchema = z.object({
  value: z.string(),
  label: z.string()
});

export type CategoryTagModel = z.infer<typeof CategoryTagModelSchema>;
export type CategoryTagSampleModel = z.infer<typeof CategoryTagSampleModelSchema>;