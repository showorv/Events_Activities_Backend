"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventSchema = exports.createEventSchema = exports.EventStatusEnum = void 0;
const zod_1 = require("zod");
// Enum for event status
exports.EventStatusEnum = zod_1.z.enum(["OPEN", "FULL", "CANCELLED", "COMPLETED"]);
// Zod schema for creating an event
exports.createEventSchema = zod_1.z.object({
    name: zod_1.z.string("Event name must be a string"),
    type: zod_1.z.string("Event type must be a string"),
    date: zod_1.z.preprocess((arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg), zod_1.z.date("Event date must be a valid date")),
    time: zod_1.z.string("Event time must be a string"),
    location: zod_1.z.string("Event location must be a string"),
    minParticipants: zod_1.z.number("Minimum participants must be a number").int().positive(),
    maxParticipants: zod_1.z.number("Maximum participants must be a number").int().positive(),
    joiningFee: zod_1.z.number().optional(),
    description: zod_1.z.string().optional(),
    status: exports.EventStatusEnum.optional(),
});
exports.updateEventSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    type: zod_1.z.string().optional(),
    date: zod_1.z.preprocess((arg) => (typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg), zod_1.z.date().optional()),
    time: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    minParticipants: zod_1.z.preprocess((val) => (val === undefined || val === null || val === "" ? undefined : Number(val)), zod_1.z.number().int().positive().optional()),
    maxParticipants: zod_1.z.preprocess((val) => (val === undefined || val === null || val === "" ? undefined : Number(val)), zod_1.z.number().int().positive().optional()),
    joiningFee: zod_1.z.preprocess((val) => (val === undefined || val === null || val === "" ? undefined : Number(val)), zod_1.z.number().optional()),
    description: zod_1.z.string().optional(),
    status: exports.EventStatusEnum.optional(),
});
//# sourceMappingURL=event.validation.js.map