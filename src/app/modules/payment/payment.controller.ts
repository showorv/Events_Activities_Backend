import { Request, Response } from "express";
import { catchAsyncError } from "../../utils/catchAsyncError";

import { envVars } from "../../config/env";
import { sendResponse } from "../../utils/response";
import httpStatus from "http-status-codes"
import { JwtPayload } from "jsonwebtoken";
import { paymentService } from "./payment.service";
import { sslcomerzService } from "../sslCommerz/sslCommerz.service";


const initPayment = catchAsyncError(async(req: Request, res: Response)=>{
   
    const eventId = req.params.eventId as string

    const decodedToken = req.user as JwtPayload
    
    const result = await paymentService.initPayment(eventId, decodedToken.userId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "payment init successfully",
        data: result
    })

})


const paymentSuccess = catchAsyncError(async(req: Request, res: Response)=>{
    const query = req.query
    const result  = await paymentService.paymentSuccess(query as Record<string,string>)

  
    if(result){
        res.redirect(`${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    }
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