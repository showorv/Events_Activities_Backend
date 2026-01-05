"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const payment_interface_1 = require("./payment.interface");
const paymentSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Event", required: true },
    host: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, unique: true },
    paymentGateway: { type: String },
    status: {
        type: String,
        enum: Object.values(payment_interface_1.PaymentStatus),
        default: payment_interface_1.PaymentStatus.UNPAID,
    },
}, { timestamps: true });
exports.Payment = mongoose_1.default.model("Payment", paymentSchema);
//# sourceMappingURL=payment.model.js.map