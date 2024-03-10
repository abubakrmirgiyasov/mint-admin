import { z } from 'zod';

import { SubCategoryModelSchema, ManufactureModelSchema, CategoryTagSampleModelSchema } from '@core/models';

export const CategoryModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  ico: z.string().nullable(),
  badgeStyle: z.string().nullable(),
  badgeText: z.string().nullable(),
  defaultLink: z.string().nullable(),
  displayOrder: z.number(),
  photo: z.string().nullable(),
  subCategories: z.lazy(() => SubCategoryModelSchema.array()).default([]),
  categoryTags: z.lazy(() => CategoryTagSampleModelSchema.array()).default([]),
  // manufactureCategories: z.lazy(() => ManufactureModelSchema).default([]),
});

export const CategorySampleModelSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export type CategoryModel = z.infer<typeof CategoryModelSchema>;
export type CategorySampleModel = z.infer<typeof CategorySampleModelSchema>;
