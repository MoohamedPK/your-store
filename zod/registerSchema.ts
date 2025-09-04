import {z} from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    confirmPassword: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters")
                .regex(/[A-Z]/, "Must contain at least one uppercase letter")
                .regex(/[0-9]/, "Must contain at least one number"),
    
}).refine((data) => data.password === data.confirmPassword, {message: "Passwords don't match", path: ["confirmPassword"],})