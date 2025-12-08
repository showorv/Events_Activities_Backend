import mongoose, { Schema, model } from "mongoose";
import { IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>({

    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },

    bio: { type: String },
    location: { type: String },
    interests: [{ type: String }],
    profileImage: { type: String },

    ratingAvg: { type: Number, default: 0 },

    isBlocked: {
        type: Boolean,
        default: false
    },
    
    isVerified: {
        type: Boolean,
        default: false
    },


    hostedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    joinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],

    isHostRequest: {
        type: Boolean,
        default: false
    },
    isHostApproved: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true
})

export const User = model<IUser>("User",userSchema)