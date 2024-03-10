import { z } from "zod";

export const ManufactureModelSchema = z.object({
  id: z.string().uuid(),
  displayOrder: z.number(),
  name: z.string(),
  country: z.string(),
  description: z.string().nullable(),
  fullAddress: z.string().nullable(),
  imagePath: z.string().nullable(),
  website: z.string().nullable(),
  // contacts: z.lazy(() => z.array(ManufactureContactModelSchema)).default([]),
});

export const ManufactureSampleModelSchema = z.object({
  value: z.string(),
  label: z.string()
});

export const ManufactureContactModelSchema = z.object({
  type: z.string(),
  contactInformation: z.string()
});

export type ManufactureContactModel = z.infer<typeof ManufactureContactModelSchema>;
export type ManufactureSampleModel = z.infer<typeof ManufactureSampleModelSchema>;
export type ManufactureModel = z.infer<typeof ManufactureModelSchema>;
