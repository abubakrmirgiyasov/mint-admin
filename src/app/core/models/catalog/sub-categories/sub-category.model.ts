import { z } from "zod";

import { CategoryModelSchema } from "@core/models";

export const SubCategoryModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  defaultLink: z.string(),
  fullName: z.string().nullable(),
});

export const SubCategoriesSampleModelSchema = z.object({
  value: z.string(),
  label: z.string()
});

export type SubCategoryModel = z.infer<typeof SubCategoryModelSchema>;
export type SubCategoriesSampleModel = z.infer<typeof SubCategoriesSampleModelSchema>;
