import { Types } from "mongoose";

export interface IRating {
    user: Types.ObjectId
    event: Types.ObjectId
    host: Types.ObjectId
    stars: number
}