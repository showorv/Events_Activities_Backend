"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventController = void 0;
const catchAsyncError_1 = require("../../utils/catchAsyncError");
const response_1 = require("../../utils/response");
const event_service_1 = require("./event.service");
const createEvent = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const decodedToken = req.user;
    const payload = {
        ...req.body,
        image: req.file?.path
    };
    const result = await event_service_1.eventService.createEvent(decodedToken.userId, payload);
    (0, response_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "event created successfully",
        data: result,
    });
});
const updateEvent = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const decodedToken = req.user;
    const payload = {
        ...req.body,
        image: req.file?.path
    };
    const id = req.params.id;
    const result = await event_service_1.eventService.updateEvent(id, decodedToken.userId, payload);
    (0, response_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "event updated successfully",
        data: result,
    });
});
const getOwnEventForHost = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const decodedToken = req.user;
    const result = await event_service_1.eventService.getOwnEventForHost(decodedToken.userId, req.query);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Host events fetched successfully",
        data: result,
    });
});
const getAllEventForAdmin = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const result = await event_service_1.eventService.getAllEventForAdmin(req.query);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "All events fetched successfully",
        data: result,
    });
});
const getAllEventForUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const result = await event_service_1.eventService.getAllEventForUser(req.query);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Events fetched successfully",
        data: result,
    });
});
const getAllJoinedEventForUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const decodedToken = req.user;
    const result = await event_service_1.eventService.getAllJoinedEventForUser(decodedToken.userId);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "joined Events fetched successfully",
        data: result,
    });
});
const getSingleEvent = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const { id } = req.params;
    const result = await event_service_1.eventService.getSingleEvent(id);
    (0, response_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "single event fetched successfully",
        data: result,
    });
});
const deleteEvent = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const decodedToken = req.user;
    const id = req.params.id;
    const result = await event_service_1.eventService.deleteEvent(decodedToken.userId, id);
    (0, response_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "event deleted successfully",
        data: result,
    });
});
const viewParticipants = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const id = req.params.id;
    const result = await event_service_1.eventService.viewParticipants(id, req.query);
    (0, response_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "participants fetched successfully",
        data: result,
    });
});
const eventRevenue = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const hostId = req.user.userId;
    // const eventId = req.params.eventId as string;
    const result = await event_service_1.eventService.getAllEventsRevenue(hostId);
    (0, response_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "event revenue get successfully",
        data: result,
    });
});
const getAllPendingPaymentsForUser = (0, catchAsyncError_1.catchAsyncError)(async (req, res) => {
    const userId = req.user.userId;
    // const eventId = req.params.eventId as string;
    const result = await event_service_1.eventService.getAllPendingPaymentsForUser(userId);
    (0, response_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Pending payment events fetched successfully",
        data: result,
    });
});
exports.eventController = { createEvent, updateEvent, getOwnEventForHost, getAllEventForAdmin, getAllEventForUser, getAllJoinedEventForUser, getSingleEvent, deleteEvent, viewParticipants, eventRevenue, getAllPendingPaymentsForUser };
//# sourceMappingURL=event.controller.js.map