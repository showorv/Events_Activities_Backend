"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateController = void 0;
const catchAsyncError_1 = require("../../utils/catchAsyncError");
const rating_service_1 = require("./rating.service");
const response_1 = require("../../utils/response");
const rateHost = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const userId = req.user.userId; // logged-in user
    const result = await rating_service_1.ratingService.rateHost(userId, req.body);
    (0, response_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Host rated successfully",
        data: result,
    });
});
const getHostRatings = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const userId = req.user.userId;
    const result = await rating_service_1.ratingService.getHostRatings(userId);
    (0, response_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "get all rate for host successfully",
        data: result,
    });
});
const getHostAverageRating = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const hostId = req.params.hostId;
    const result = await rating_service_1.ratingService.getHostAverageRating(hostId);
    (0, response_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "get host rate successfully",
        data: result,
    });
});
exports.rateController = { rateHost, getHostRatings, getHostAverageRating };
//# sourceMappingURL=rating.controller.js.map