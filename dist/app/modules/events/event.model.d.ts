import mongoose from "mongoose";
import { IEvent } from "./event.interface";
export declare const Event: mongoose.Model<IEvent, {}, {}, {}, mongoose.Document<unknown, {}, IEvent, {}, mongoose.DefaultSchemaOptions> & IEvent & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IEvent>;
//# sourceMappingURL=event.model.d.ts.map