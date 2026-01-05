import { Types } from "mongoose";
export declare enum participantsStatus {
    JOINED = "JOINED",
    CANCELLED = "CANCELLED",
    REMOVED = "REMOVED"
}
export declare enum participantsPaymentStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
}
export interface IParticipants {
    user: Types.ObjectId;
    event: Types.ObjectId;
    status?: participantsStatus;
    paymentStatus?: participantsPaymentStatus;
}
//# sourceMappingURL=participants.interface.d.ts.map