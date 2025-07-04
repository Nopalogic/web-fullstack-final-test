import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username must be filled"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginValues = z.infer<typeof loginSchema>;
