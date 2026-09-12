import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Can't be empty" })
    .email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = loginSchema
  .extend({
    password: z
      .string()
      .trim()
      .min(1, { message: "Can't be empty" })
      .min(8, { message: "Password must contain at least 8 characters" }),
    confirmPassword: z.string().trim().min(1, { message: "Can't be empty" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });
