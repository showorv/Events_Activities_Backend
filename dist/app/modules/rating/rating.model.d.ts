import mongoose from "mongoose";
import { IRating } from "./rating.interface";
export declare const Rating: mongoose.Model<IRating, {}, {}, {}, mongoose.Document<unknown, {}, IRating, {}, mongoose.DefaultSchemaOptions> & IRating & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, IRating>;
//# sourceMappingURL=rating.model.d.ts.map