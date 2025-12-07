import mongoose from "mongoose";
import { IPayment, PaymentStatus } from "./payment.interface";

const paymentSchema = new mongoose.Schema<IPayment>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },

    amount: { type: Number, required: true },
    transactionId: { type: String, unique: true },
    paymentGateway: { type: String }, 

    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.UNPAID,
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
