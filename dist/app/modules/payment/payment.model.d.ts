import mongoose from "mongoose";
import { IPayment } from "./payment.interface";
export declare const Payment: mongoose.Model<IPayment, {}, {}, {}, mongoose.Document<unknown, {}, IPayment, {}, mongoose.DefaultSchemaOptions> & IPayment & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, IPayment>;
//# sourceMappingURL=payment.model.d.ts.map