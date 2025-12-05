import z from "zod";
import { Role } from "./user.interface";


export const createUserValidation = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),



    bio:  z.string().max(1000).optional(),
    location: z.string().max(255).optional(),
    interests: z.array(z.string()).optional(),
    
})

export const updateUserValidation = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),

    bio:  z.string().max(1000).optional(),
    location: z.string().max(255).optional(),
    interests: z.array(z.string()).optional(),
    role: z.enum(Object.values(Role) as [string]).optional(),
    isDeleted: z.boolean().optional(),
  
    isVerified: z.boolean().optional(),
})