"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participationController = void 0;
const catchAsyncError_1 = require("../../utils/catchAsyncError");
const response_1 = require("../../utils/response");
const participants_service_1 = require("./participants.service");
const joinEvent = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const decodedToken = req.user;
    const id = req.params.id;
    const result = await participants_service_1.participationService.joinEvent(decodedToken.userId, id);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "join event successfully",
        data: result,
    });
});
const leaveEvent = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const decodedToken = req.user;
    const id = req.params.id;
    const result = await participants_service_1.participationService.leaveEvent(decodedToken.userId, id);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "leave event successfully",
        data: result,
    });
});
exports.participationController = { joinEvent, leaveEvent };
//# sourceMappingURL=participants.controller.js.map