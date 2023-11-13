import { z } from "zod";

export const newFormSchema = z.object({
  title: z
    .string({ required_error: "Required field" })
    .min(1, { message: "Required field" }),
  body: z
    .string({ required_error: "Required field" })
    .min(1, { message: "Required field" }),
  isPublished: z.boolean().optional(),
  publishDate: z.string().datetime().optional(),
});

export type NewEditorFormSchema = z.infer<typeof newFormSchema>;
