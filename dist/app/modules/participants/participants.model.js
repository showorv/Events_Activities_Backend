"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const participants_interface_1 = require("./participants.interface");
const participationSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    event: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(participants_interface_1.participantsStatus),
        default: participants_interface_1.participantsStatus.JOINED,
    },
    paymentStatus: {
        type: String,
        enum: Object.values(participants_interface_1.participantsPaymentStatus),
        //   default: participantsPaymentStatus.PENDING,
    },
}, { timestamps: true });
exports.Participation = mongoose_1.default.model("Participation", participationSchema);
//# sourceMappingURL=participants.model.js.map