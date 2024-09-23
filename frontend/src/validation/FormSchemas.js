import { z } from "zod";

const LoginWithUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username too short")
    .max(20, "Username cannot be more than 20 characters"),
  password: z
    .string()
    .min(3, "Password too short")
    .max(50, "Password too long"),
});
const LoginWithEmailFormSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(3, "Username too short"),
  password: z
    .string()
    .min(3, "Password too short")
    .max(50, "Password too long"),
});
const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username too short")
    .max(20, "Username cannot be more than 20 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(3, "Username too short"),
  firstname: z
    .string()
    .min(3, "firstname too short")
    .max(20, "firstname cannot be more than 30 characters"),
  lastname: z
    .string()
    .min(1, "firstname too short")
    .max(20, "firstname cannot be more than 30 characters"),
  password: z
    .string()
    .min(3, "Password too short")
    .max(50, "Password too long"),
    confirmpassword: z.string().min(3, "Password too short").max(50, "Password too long")
}).refine((values)=>values.password===values.confirmpassword, { message: "Password does not match", path: ["confirmpassword"] });

export { LoginWithUsernameFormSchema, LoginWithEmailFormSchema, RegisterFormSchema };
