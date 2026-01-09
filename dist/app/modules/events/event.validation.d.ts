import { z } from "zod";
export declare const EventStatusEnum: z.ZodEnum<{
    OPEN: "OPEN";
    FULL: "FULL";
    CANCELLED: "CANCELLED";
    COMPLETED: "COMPLETED";
}>;
export declare const createEventSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodString;
    date: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodDate>;
    time: z.ZodString;
    location: z.ZodString;
    minParticipants: z.ZodNumber;
    maxParticipants: z.ZodNumber;
    joiningFee: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        OPEN: "OPEN";
        FULL: "FULL";
        CANCELLED: "CANCELLED";
        COMPLETED: "COMPLETED";
    }>>;
}, z.core.$strip>;
export declare const updateEventSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodString>;
    date: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodOptional<z.ZodDate>>;
    time: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    minParticipants: z.ZodPipe<z.ZodTransform<number | undefined, unknown>, z.ZodOptional<z.ZodNumber>>;
    maxParticipants: z.ZodPipe<z.ZodTransform<number | undefined, unknown>, z.ZodOptional<z.ZodNumber>>;
    joiningFee: z.ZodPipe<z.ZodTransform<number | undefined, unknown>, z.ZodOptional<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        OPEN: "OPEN";
        FULL: "FULL";
        CANCELLED: "CANCELLED";
        COMPLETED: "COMPLETED";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=event.validation.d.ts.map