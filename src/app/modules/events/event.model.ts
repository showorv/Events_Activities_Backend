

import mongoose from "mongoose";
import { IEvent, Status } from "./event.interface";

const eventSchema = new mongoose.Schema<IEvent>(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
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
      enum: Object.values(Status),
      default: Status.OPEN,
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participation",
      },
    ],
  },
  { timestamps: true }
);

export const Event = mongoose.model<IEvent>("Event", eventSchema);
