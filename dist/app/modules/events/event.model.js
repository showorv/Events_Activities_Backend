"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const event_interface_1 = require("./event.interface");
const eventSchema = new mongoose_1.default.Schema({
    host: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    minParticipants: { type: Number, required: true },
    maxParticipants: { type: Number, required: true },
    joiningFee: { type: Number, default: 0 },
    description: { type: String },
    image: { type: String },
    status: {
        type: String,
        enum: Object.values(event_interface_1.Status),
        default: event_interface_1.Status.OPEN,
    },
    participants: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Participation",
        },
    ],
}, { timestamps: true });
exports.Event = mongoose_1.default.model("Event", eventSchema);
//# sourceMappingURL=event.model.js.map