import mongoose from "mongoose";
import { IParticipants } from "./participants.interface";
export declare const Participation: mongoose.Model<IParticipants, {}, {}, {}, mongoose.Document<unknown, {}, IParticipants, {}, mongoose.DefaultSchemaOptions> & IParticipants & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, IParticipants>;
//# sourceMappingURL=participants.model.d.ts.map