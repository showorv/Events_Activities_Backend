"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsyncError_1 = require("../../utils/catchAsyncError");
const response_1 = require("../../utils/response");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const payload = {
        ...req.body,
        profileImage: req.file?.path
    };
    const user = await user_service_1.userService.createUser(payload);
    (0, response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "User created successfully",
        data: user
    });
});
const getAllUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const result = await user_service_1.userService.getAllUser(req.query);
    (0, response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "User retrived successfully",
        data: result.data,
        metaData: result.meta
    });
});
const blockUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const result = await user_service_1.userService.blockUser(req.params.userId);
    (0, response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "user blocked successfully",
        data: result,
    });
});
const unblockUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const result = await user_service_1.userService.unBlockUser(req.params.userId);
    (0, response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "user unblocked successfully",
        data: result,
    });
});
const getSingleUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const userId = req.params.userId;
    const user = await user_service_1.userService.getSingleUser(userId);
    (0, response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "single user get successfully",
        data: user,
    });
});
const updateUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const userId = req.params.id;
    const tokenVerified = req.user;
    const payload = {
        ...req.body,
        profileImage: req.file?.path
    };
    const updateUser = await user_service_1.userService.updateUser(userId, payload, tokenVerified);
    (0, response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Users updated successfully",
        data: updateUser,
    });
});
const getMe = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const decodedToken = req.user;
    const user = await user_service_1.userService.getMe(decodedToken.userId);
    (0, response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "your profile retrived successfully",
        data: user,
    });
});
const becomeHost = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const decodedToken = req.user;
    const user = await user_service_1.userService.becomeHost(decodedToken.userId);
    (0, response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "become host request sent successfully",
        data: user,
    });
});
const approveHost = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const userId = req.params.userId;
    const user = await user_service_1.userService.becomeHost(userId);
    (0, response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "approve host successfully",
        data: user,
    });
});
const getAllHostRequest = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const user = await user_service_1.userService.getAllHostRequest();
    (0, response_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "requested host get successfully",
        data: user,
    });
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    getMe,
    blockUser,
    unblockUser,
    becomeHost,
    approveHost,
    getAllHostRequest
};
//# sourceMappingURL=user.controller.js.map