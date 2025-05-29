import { z } from "zod";

export const CreateBlogValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  summary: z.string().optional(),
  coverImage: z.string().min(1, "Cover image URL is required").optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  category: z.string().min(1, "Category is required").optional(),
  published: z.boolean().default(false).optional(),
  description: z.string().min(1, "Description is required"),
  featured: z.boolean().default(false).optional(),
});
