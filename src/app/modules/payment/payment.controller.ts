import { Request, Response } from "express";
import { catchAsyncError } from "../../utils/catchAsyncError";

import { envVars } from "../../config/env";
import { sendResponse } from "../../utils/response";
import httpStatus from "http-status-codes"
import { JwtPayload } from "jsonwebtoken";
import { paymentService } from "./payment.service";
import { sslcomerzService } from "../sslCommerz/sslCommerz.service";
import { Payment } from "./payment.model";
import AppError from "../../errorHelpers/AppError";


// const initPayment = catchAsyncError(async(req: Request, res: Response)=>{
   
//     const eventId = req.params.eventId as string

//     const decodedToken = req.user as JwtPayload
    
//     const result = await paymentService.initPayment(eventId, decodedToken.userId)

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "payment init successfully",
//         data: result
//     })

// })

const initPayment = catchAsyncError(async (req: Request, res: Response) => {
    const eventId = req.params.eventId as string;
    const decodedToken = req.user as JwtPayload;
  
    const result = await paymentService.initPayment(eventId, decodedToken.userId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment initialized successfully",
      data: result,
    });
  });
  
const paymentSuccess = catchAsyncError(async(req: Request, res: Response)=>{
    const query = req.query
    const result  = await paymentService.paymentSuccess(query as Record<string,string>)

  
    // if(result){
    //     // res.redirect(`${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    //     res.redirect(
    //         `${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}&eventId=${query.eventId}&hostId=${query.hostId}`
    //       );
    // }
    const payment = await Payment.findOne({ transactionId: query.transactionId as string });

    if (!payment) throw new AppError(404, "Payment not found");
  
    const eventId = payment.event.toString();
    const hostId = payment.host.toString();
  
    // Redirect with correct eventId and hostId
    res.redirect(
      `${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${payment.amount}&status=success&eventId=${eventId}&hostId=${hostId}`
    );
})
const paymentFail = catchAsyncError(async(req: Request, res: Response)=>{
    const query = req.query
    const result  = await paymentService.paymentFail(query as Record<string,string>)

    if(result){
        res.redirect(`${envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
})
const paymentCancel = catchAsyncError(async(req: Request, res: Response)=>{
    const query = req.query
    const result  = await paymentService.paymentCancel(query as Record<string,string>)

    if(result){
        res.redirect(`${envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
})


const validatePayment = catchAsyncError(async(req: Request, res: Response)=>{

    console.log("sslcomerz ipn url body", req.body);
    
   
    await sslcomerzService.validatePayment(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "payment validated successfully",
        data: null
    })

})


export const paymentController = {paymentFail,paymentSuccess,paymentCancel,initPayment, validatePayment}