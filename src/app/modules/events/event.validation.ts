import { z } from "zod";

// Enum for event status
export const EventStatusEnum = z.enum(["OPEN", "FULL", "CANCELLED", "COMPLETED"]);

// Zod schema for creating an event
export const createEventSchema = z.object({
  name: z.string("Event name must be a string"),
  type: z.string("Event type must be a string",
),
  date: z.preprocess((arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg), z.date("Event date must be a valid date")),
  time: z.string("Event time must be a string"
  ),
  location: z.string("Event location must be a string",),
  minParticipants: z.number("Minimum participants must be a number",).int().positive(),
  maxParticipants: z.number( "Maximum participants must be a number",).int().positive(),
  joiningFee: z.number().optional(),
  description: z.string().optional(),
  status: EventStatusEnum.optional(),
});
