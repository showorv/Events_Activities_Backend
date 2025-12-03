import z from "zod";


export const createUserValidation = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),



    bio:  z.string().max(1000).optional(),
    location: z.string().max(255).optional(),
    interests: z.array(z.string()).optional(),
    
})