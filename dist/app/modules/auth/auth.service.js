"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("../user/user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../config/env");
const createUserToken_1 = require("../../utils/createUserToken");
const createLoginService = async (payload) => {
    const { email, password } = payload;
    if (!email) {
        throw new AppError_1.default(401, "email req");
    }
    const userExist = await user_model_1.User.findOne({ email });
    if (!userExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Email is incorrect");
    }
    const isPasswordMatch = await bcryptjs_1.default.compare(password, userExist.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "password is incorrect");
    }
    // const jsonPayload = {
    //     userId: userExist._id,
    //     email: userExist.email,
    //     role: userExist.role
    // }
    const accessUserToken = (0, createUserToken_1.createUserToken)(userExist);
    // const refreshToken = generateToken(jsonPayload, envVars.JWT_REFRESH_SECRET as string, envVars.JWT_REFRESH_EXPIRED as string)
    const { password: pass, ...rest } = userExist.toObject();
    return {
        accessToken: accessUserToken.accessToken,
        refreshToken: accessUserToken.refreshToken,
        user: rest
    };
};
// const getNewAccessToken =async ( refreshToken: string)=>{
//     const verifiedRefreshToken = verifiedToken(refreshToken, envVars.JWT_REFRESH_SECRET as string) as JwtPayload;
//     const userExist = await User.findOne({email: verifiedRefreshToken.email})
//     if(!userExist){
//         throw new AppError(httpsCode.BAD_REQUEST, "user not exist")
//     }
//     if(userExist.isActive === IActive.BLOCKED ||userExist.isActive === IActive.INACTIVE ){
//         throw new AppError(httpsCode.BAD_REQUEST, "user is block or inactive")
//     }
//     if(userExist.isDeleted){
//         throw new AppError(httpsCode.BAD_REQUEST, "user is deleted")
//     }
//     const jsonPayload = {
//         userId: userExist._id,
//         email: userExist.email,
//         role: userExist.role
//     }
//     const accessToken = generateToken(jsonPayload, envVars.JWT_SECRET as string, envVars.JWR_EXPIRED as string)
//     return {
//         accessToken,
//     }
// }
const changePassword = async (oldPassword, newPassword, decodedToken) => {
    // check old password  get old password from verifiedtoken. hash the newpassword and save in user
    const user = await user_model_1.User.findById(decodedToken.userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "user not found");
    }
    const isOldPasswordMatch = await bcryptjs_1.default.compare(oldPassword, user.password);
    if (!isOldPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "old password is incorrect");
    }
    if (oldPassword === newPassword) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "new password cannot be same as old password");
    }
    user.password = await bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.HASH_SALT));
    user.save();
};
// const setPassword =async (userId: string, password: string)=>{
//    const user = await User.findById(userId)
//    if(!user){
//     throw new AppError(httpsCode.FORBIDDEN, "user not found")
//    }
//    if( user.password && user.auths.some(providerObject => providerObject.provider==="google")){
//     throw new AppError(httpsCode.FORBIDDEN, "user already has password. you can change password from profile")
//    }
//    const hashPassword = await bcryptjs.hash ( password, Number(envVars.HASH_SALT))
//    const credentialAuths : IAuths = {
//     provider: "credential",
//     providerId: user.email
//    }
//    const auths: IAuths [] = [...user.auths, credentialAuths]
//    user.password = hashPassword
//    user.auths = auths
//    await user.save()
// }
// const forgotPassword =async (email: string)=>{
//    const userExist = await User.findOne({email})
//         if(!userExist){
//             throw new AppError(httpsCode.BAD_REQUEST, "user not exist")
//         }
//         if(userExist.isActive === IActive.BLOCKED ||userExist.isActive === IActive.INACTIVE ){
//             throw new AppError(httpsCode.BAD_REQUEST, "user is block or inactive")
//         }
//         if(userExist.isDeleted){
//             throw new AppError(httpsCode.BAD_REQUEST, "user is deleted")
//         }
//         if(!userExist.isVerified){
//         throw new AppError(httpsCode.BAD_REQUEST, "user is not verified")
//         }
//         const JwtPayload = {
//             userId: userExist._id,
//             email: userExist.email,
//             role: userExist.role
//         }
//         const resetToken = jwt.sign(JwtPayload, envVars.JWT_SECRET as string , {
//             expiresIn: "10m"
//         })
//         const forgotUILink = `${envVars.FRONTEND_URL}/reset-password?id=${userExist._id}&token=${resetToken}`
//         sendEmail({
//             to: userExist.email,
//             subject: "Reset Password ",
//             templateName: "sendEmail",
//             templateData: {
//                 name: userExist.name,
//                 reseturl: forgotUILink,
//             }
//         })
// }
// const resetPassword =async (payload: Record<string,any>, decodedToken: JwtPayload)=>{
//     if(payload.id !== decodedToken.userId){
//         throw new AppError(401, "you cannot change password")
//     }
//     const user = await User.findById(decodedToken.userId)
//     if(!user){
//         throw new AppError(401, "user not found")
//     }
//     const hashPassword = await bcryptjs.hash ( payload.newPassword, Number(envVars.HASH_SALT))
//     user.password = hashPassword
//     await user.save()
// }
exports.authService = {
    createLoginService,
    changePassword,
};
//# sourceMappingURL=auth.service.js.map