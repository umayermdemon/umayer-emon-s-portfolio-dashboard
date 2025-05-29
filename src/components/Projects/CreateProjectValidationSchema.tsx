import { z } from "zod";

export const CreateProjectValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  liveLinks: z.string().min(1, "Live link is required"),
  clientRepo: z.string().min(1, "Client repo is required"),
  serverRepo: z.string().optional(),
  frontendTechnologies: z
    .array(z.string().min(1))
    .min(1, "At least one frontend technology is required"),
  backendTechnologies: z
    .array(z.string().min(1))
    .min(1, "At least one backend technology is required"),
  duration: z.string().optional(),
  teamMembers: z.array(z.string().min(1)).optional(),
  demoVideo: z.string().optional(),
  status: z.enum(["completed", "in-progress", "planned"]).optional(),
  featured: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  images: z.array(z.string().min(1)).optional(),
});
