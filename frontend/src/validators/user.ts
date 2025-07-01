import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name must be filled"),
  username: z.string().min(1, "Username must be filled"),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  role: z.enum(["cashier", "admin"]),
});

export type UserValues = z.infer<typeof userSchema>;
