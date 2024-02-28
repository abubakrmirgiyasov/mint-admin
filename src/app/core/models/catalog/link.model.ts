import { z } from 'zod';

export const DefaultLinkModelSchema = z.object({
  id: z.string(),
  defaultLink: z.string().nullable(),
  displayOrder: z.number(),
});

export type DefaultLinkModel = z.infer<typeof DefaultLinkModelSchema>;
