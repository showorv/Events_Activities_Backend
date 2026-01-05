"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const payment_interface_1 = require("./payment.interface");
const payment_model_1 = require("./payment.model");
const event_model_1 = require("../events/event.model");
const sslCommerz_service_1 = require("../sslCommerz/sslCommerz.service");
const participants_model_1 = require("../participants/participants.model");
const participants_interface_1 = require("../participants/participants.interface");
const user_model_1 = require("../user/user.model");
// const initPayment = async (eventId: string, userId: string) => {
//   const event = await Event.findById(eventId);
//   if (!event) {
//     throw new AppError(httpsStatus.NOT_FOUND, "Event not found");
//   }
//   const user = await User.findById(userId)
//   if(!user){
//     throw new AppError(httpsStatus.NOT_FOUND, "user not found");
//   }
//   if (event.joiningFee === 0) {
//     throw new AppError(400, "This event is free. No payment required.");
//   }
//   // Check existing payment
//   let payment = await Payment.findOne({ event: eventId, user: userId });
//   if (!payment) {
//     payment = await Payment.create({
//       event: eventId,
//       user: userId,
//       amount: event.joiningFee as number,
//       transactionId: `TRX-${Date.now()}`,
//       status: PaymentStatus.UNPAID,
//     });
//   }
//   const sslPayload = {
//     name: user.name,
//     email: user.email,
//     address: user.location as string,
//     transactionId: payment.transactionId,
//     amount: event.joiningFee as number,
//   };
//   const sslcommerz = await sslcomerzService.sslcomerzInitialize(sslPayload);
//   return {
//     paymentUrl: sslcommerz.GatewayPageURL,
//   };
// };
const initPayment = async (eventId, userId) => {
    const event = await event_model_1.Event.findById(eventId).populate("host"); // populate host
    if (!event)
        throw new AppError_1.default(404, "Event not found");
    const user = await user_model_1.User.findById(userId);
    if (!user)
        throw new AppError_1.default(404, "User not found");
    if (event.joiningFee === 0) {
        throw new AppError_1.default(400, "This event is free. No payment required.");
    }
    let payment = await payment_model_1.Payment.findOne({ event: eventId, user: userId });
    if (!payment) {
        payment = await payment_model_1.Payment.create({
            event: eventId,
            user: userId,
            host: event.host._id,
            amount: event.joiningFee,
            transactionId: `TRX-${Date.now()}`,
            status: payment_interface_1.PaymentStatus.UNPAID,
        });
    }
    const sslPayload = {
        name: user.name,
        email: user.email,
        address: user.location,
        transactionId: payment.transactionId,
        amount: event.joiningFee,
    };
    const sslcommerz = await sslCommerz_service_1.sslcomerzService.sslcomerzInitialize(sslPayload);
    return {
        paymentUrl: sslcommerz.GatewayPageURL,
        eventId: event._id,
        hostId: event.host._id,
    };
};
const paymentSuccess = async (query) => {
    const session = await payment_model_1.Payment.startSession();
    session.startTransaction();
    try {
        const payment = await payment_model_1.Payment.findOneAndUpdate({ transactionId: query.transactionId }, { status: payment_interface_1.PaymentStatus.PAID }, { new: true, session });
        if (!payment)
            throw new AppError_1.default(404, "Payment not found");
        const participation = await participants_model_1.Participation.findOneAndUpdate({
            event: payment.event,
            user: payment.user,
        }, {
            paymentStatus: participants_interface_1.participantsPaymentStatus.PAID,
        }, { new: true, session });
        if (!participation) {
            throw new AppError_1.default(404, "Participation record not found for this user");
        }
        await session.commitTransaction();
        const eventId = payment.event.toString();
        const hostId = payment.host.toString();
        return {
            message: "Payment successful",
            eventId,
            hostId,
        };
    }
    catch (err) {
        await session.abortTransaction();
        throw err;
    }
    finally {
        session.endSession();
    }
};
const paymentFail = async (query) => {
    await payment_model_1.Payment.findOneAndUpdate({ transactionId: query.transactionId }, { status: payment_interface_1.PaymentStatus.FAILED });
    return { message: "Payment failed" };
};
const paymentCancel = async (query) => {
    await payment_model_1.Payment.findOneAndUpdate({ transactionId: query.transactionId }, { status: payment_interface_1.PaymentStatus.CANCELLED });
    return { message: "Payment cancelled" };
};
exports.paymentService = {
    initPayment,
    paymentSuccess,
    paymentFail,
    paymentCancel,
};
//# sourceMappingURL=payment.service.js.map