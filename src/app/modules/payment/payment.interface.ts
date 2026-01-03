import { Types } from "mongoose";


export enum PaymentStatus{
    PAID= "PAID",
    UNPAID = "UNPAID",
    CANCELLED = "CANCELLED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
}


export interface IPayment {

    user: Types.ObjectId;
    event: Types.ObjectId
   host: Types.ObjectId
    transactionId: string;
    amount: number;
    paymentGateway ?: any;
    
    status: PaymentStatus

}