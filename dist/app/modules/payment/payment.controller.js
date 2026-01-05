"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const catchAsyncError_1 = require("../../utils/catchAsyncError");
const env_1 = require("../../config/env");
const response_1 = require("../../utils/response");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const payment_service_1 = require("./payment.service");
const sslCommerz_service_1 = require("../sslCommerz/sslCommerz.service");
const payment_model_1 = require("./payment.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
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
const initPayment = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const eventId = req.params.eventId;
    const decodedToken = req.user;
    const result = await payment_service_1.paymentService.initPayment(eventId, decodedToken.userId);
    (0, response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Payment initialized successfully",
        data: result,
    });
});
const paymentSuccess = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const query = req.query;
    const result = await payment_service_1.paymentService.paymentSuccess(query);
    // if(result){
    //     // res.redirect(`${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`)
    //     res.redirect(
    //         `${envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}&eventId=${query.eventId}&hostId=${query.hostId}`
    //       );
    // }
    const payment = await payment_model_1.Payment.findOne({ transactionId: query.transactionId });
    if (!payment)
        throw new AppError_1.default(404, "Payment not found");
    const eventId = payment.event.toString();
    const hostId = payment.host.toString();
    // Redirect with correct eventId and hostId
    res.redirect(`${env_1.envVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${payment.amount}&status=success&eventId=${eventId}&hostId=${hostId}`);
});
const paymentFail = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const query = req.query;
    const result = await payment_service_1.paymentService.paymentFail(query);
    if (result) {
        res.redirect(`${env_1.envVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`);
    }
});
const paymentCancel = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const query = req.query;
    const result = await payment_service_1.paymentService.paymentCancel(query);
    if (result) {
        res.redirect(`${env_1.envVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${result.message}&amount=${query.amount}&status=${query.status}`);
    }
});
const validatePayment = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    console.log("sslcomerz ipn url body", req.body);
    await sslCommerz_service_1.sslcomerzService.validatePayment(req.body);
    (0, response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "payment validated successfully",
        data: null
    });
});
exports.paymentController = { paymentFail, paymentSuccess, paymentCancel, initPayment, validatePayment };
//# sourceMappingURL=payment.controller.js.map