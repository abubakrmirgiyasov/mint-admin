import { z } from "zod";

export const ManufactureModelSchema = z.object({});

export const ManufactureSampleModelSchema = z.object({
  value: z.string(),
  label: z.string()
});

export type ManufactureSampleModel = z.infer<typeof ManufactureSampleModelSchema>;
export type ManufactureModel = z.infer<typeof ManufactureModelSchema>;
