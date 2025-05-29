import { z } from "zod";

export const CreateSkillValidationSchema = z.object({
  skillName: z.string().min(1, "Skill Name is required"),
  description: z.string().min(1, "Description is required"),
});
