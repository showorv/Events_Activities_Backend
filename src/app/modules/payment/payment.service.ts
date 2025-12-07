import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { PaymentStatus } from "./payment.interface";
import { Payment } from "./payment.model";


import httpsStatus from "http-status-codes";
import { Event } from "../events/event.model";
import { sslcomerzService } from "../sslCommerz/sslCommerz.service";
import { Participation } from "../participants/participants.model";
import { participantsPaymentStatus } from "../participants/participants.interface";
import { User } from "../user/user.model";



const initPayment = async (eventId: string, userId: string) => {

  const event = await Event.findById(eventId);

  if (!event) {
    throw new AppError(httpsStatus.NOT_FOUND, "Event not found");
  }

  const user = await User.findById(userId)

  if(!user){
    throw new AppError(httpsStatus.NOT_FOUND, "user not found");
  }
  if (event.joiningFee === 0) {
    throw new AppError(400, "This event is free. No payment required.");
  }

  // Check existing payment
  let payment = await Payment.findOne({ event: eventId, user: userId });

  if (!payment) {
    payment = await Payment.create({
      event: eventId,
      user: userId,
      amount: event.joiningFee as number,
      transactionId: `TRX-${Date.now()}`,
      status: PaymentStatus.UNPAID,
    });
  }

  const sslPayload = {
    name: user.name,
    email: user.email,
    address: user.location as string,
    transactionId: payment.transactionId,
    amount: event.joiningFee as number,
  };

  const sslcommerz = await sslcomerzService.sslcomerzInitialize(sslPayload);

  return {
    paymentUrl: sslcommerz.GatewayPageURL,
  };
};



const paymentSuccess = async (query: Record<string, string>) => {
  const session = await Payment.startSession();
  session.startTransaction();

  try {
    const payment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId as string},
      { status: PaymentStatus.PAID },
      { new: true, session }
    );

    if (!payment) throw new AppError(404, "Payment not found");

    const participation = await Participation.findOneAndUpdate(
        {
          event: payment.event,
          user: payment.user,
        },
        {
          paymentStatus: participantsPaymentStatus.PAID,
        },
        { new: true, session }
      );
  
      if (!participation) {
        throw new AppError(404, "Participation record not found for this user");
      }



    await session.commitTransaction();
    return { message: "Payment successful" };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};



const paymentFail = async (query: Record<string, string>) => {
  await Payment.findOneAndUpdate(
    { transactionId: query.transactionId as string},
    { status: PaymentStatus.FAILED }
  );

  return { message: "Payment failed" };
};


const paymentCancel = async (query: Record<string, string>) => {
  await Payment.findOneAndUpdate(
    { transactionId: query.transactionId as string},
    { status: PaymentStatus.CANCELLED }
  );

  return { message: "Payment cancelled" };
};





export const paymentService = {
  initPayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
 
};
