"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsyncError_1 = require("../../utils/catchAsyncError");
const auth_service_1 = require("./auth.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const response_1 = require("../../utils/response");
const cookieSet_1 = require("../../utils/cookieSet");
const createLogin = (0, catchAsyncError_1.catchAsyncError)(async (req, res, next) => {
    const loginInfo = await auth_service_1.authService.createLoginService(req.body);
    (0, cookieSet_1.setCookies)(res, loginInfo);
    (0, response_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "User login successfully",
        data: loginInfo
    });
});
const logout = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    res.clearCookie("access-token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        message: "User logged out",
        data: null
    });
});
const changePassword = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const decodedToken = req.user;
    await auth_service_1.authService.changePassword(oldPassword, newPassword, decodedToken);
    res.status(http_status_codes_1.default.OK).json({
        success: true,
        message: "password change successfully",
        data: null
    });
});
// const resetPassword = catchAsyncError(async(req: Request, res: Response)=>{
//     const decodedToken =  req.user
//     await authService.resetPassword(req.body, decodedToken as JwtPayload)
//     res.status(httpsCode.OK).json({
//         success: true,
//         message: "password reset successfully",
//         data: null
//     })
// })
// const setPassword = catchAsyncError(async(req: Request, res: Response)=>{
//     const decodedToken =  req.user as JwtPayload
//     const {password} = req.body
//     await authService.setPassword( decodedToken.userId , password)
//     res.status(httpsCode.OK).json({
//         success: true,
//         message: "password set successfully",
//         data: null
//     })
// })
// const forgotPassword = catchAsyncError(async(req: Request, res: Response)=>{
//     const {email} = req.body
//     await authService.forgotPassword( email)
//     res.status(httpsCode.OK).json({
//         success: true,
//         message: "reset password link sent successfully",
//         data: null
//     })
// })
// // http://localhost:5000/api/v1/auth/google?redirect=/booking
// const googleController = catchAsyncError(async(req: Request, res: Response)=>{
//     const redirect = req.query.redirect || "";
// console.log(redirect);
//     passport.authenticate("google", {scope: ["profile", "email"], state: redirect as string})(req,res)
// })
// // http://localhost:5000/api/v1/auth/google/callback?state=/booking or /
// const googleCallback = catchAsyncError(async(req: Request, res: Response)=>{
//     let state = req.query.state? req.query.state as string : ""
//     if(state.startsWith("/")){
//         state= state.slice(1) // /booking-> booking
//     }
//     //  jkhn passport e user create hobe tkhn passport amdr k ta req.user e diye dibe
//     const user= req.user
//     console.log("user", user);
//     if(!user){
//         throw new AppError(httpsCode.NOT_FOUND, "user not found")
//     }
//     const tokenInfo = createUserToken(user as Iuser);
//     setCookies(res, tokenInfo);
//     res.redirect(`${envVars.FRONTEND_URL as string}/${state}`)
// })
exports.authController = {
    createLogin,
    logout,
    changePassword,
};
//# sourceMappingURL=auth.controller.js.map