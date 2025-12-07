import mongoose from "mongoose";
import { IRating } from "./rating.interface";

const ratingSchema = new mongoose.Schema <IRating>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },

    stars: { type: Number, min: 1, max: 5, required: true },
   
  },
  { timestamps: true }
);

export const Rating = mongoose.model<IRating>("Rating", ratingSchema);