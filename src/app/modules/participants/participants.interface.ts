import { Types } from "mongoose";

export enum participantsStatus {
    JOINED="JOINED",
    CANCELLED= "CANCELLED",
    REMOVED="REMOVED"
}
export enum participantsPaymentStatus {
    PENDING="PENDING",
    PAID= "PAID",
    FAILED="FAILED",
    REFUNDED="REFUNDED"
}

export interface IParticipants {
    user: Types.ObjectId,
    event: Types.ObjectId,
    status?: participantsStatus,
    paymentStatus?: participantsPaymentStatus

}