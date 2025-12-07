import mongoose from "mongoose";
import { IParticipants, participantsPaymentStatus, participantsStatus } from "./participants.interface";


const participationSchema = new mongoose.Schema<IParticipants>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    status: {
      type: String,
      enum:Object.values(participantsStatus),
      default: participantsStatus.JOINED,
    },

    paymentStatus: {
      type: String,
      enum: Object.values(participantsPaymentStatus),
    //   default: participantsPaymentStatus.PENDING,
    },
  },
  { timestamps: true }
);

export const Participation = mongoose.model<IParticipants>("Participation", participationSchema);
