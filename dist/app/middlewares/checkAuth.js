"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const generateToken_1 = require("../utils/generateToken");
const env_1 = require("../config/env");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = require("../modules/user/user.model");
const checkAuth = (...authRoles) => async (req, res, next) => {
    try {
        const accessToken = req.cookies["accessToken"];
        if (!accessToken) {
            throw new AppError_1.default(403, "access token undefined");
        }
        const verifiedTokens = (0, generateToken_1.verifiedToken)(accessToken, env_1.envVars.JWT_SECRET);
        const userExist = await user_model_1.User.findOne({ email: verifiedTokens.email });
        if (!userExist) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "user not exist");
        }
        if (userExist.isBlocked) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "user is blocked");
        }
        //   if(!userExist.isVerified){
        //     throw new AppError(httpsCode.BAD_REQUEST, "user is not verified")
        //   }
        req.user = verifiedTokens;
        if (!authRoles.includes(verifiedTokens.role)) {
            throw new AppError_1.default(403, "you cannot access this route");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map