"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = exports.getAllPendingPaymentsForUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const event_model_1 = require("./event.model");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const queryBuilder_1 = require("../../utils/queryBuilder");
const participants_model_1 = require("../participants/participants.model");
const payment_model_1 = require("../payment/payment.model");
const participants_interface_1 = require("../participants/participants.interface");
const payment_interface_1 = require("../payment/payment.interface");
const createEvent = async (hostId, payload) => {
    if (!hostId) {
        throw new AppError_1.default(402, "you cannot create event");
    }
    const eventPayload = {
        ...payload,
        host: new mongoose_1.default.Types.ObjectId(hostId),
    };
    const event = await event_model_1.Event.create(eventPayload);
    return event;
};
const updateEvent = async (id, hostId, payload) => {
    const eventExist = await event_model_1.Event.findById(id);
    if (!eventExist) {
        throw new AppError_1.default(401, "event not found");
    }
    const host = new mongoose_1.default.Types.ObjectId(hostId);
    if (!eventExist.host.equals(host)) {
        throw new AppError_1.default(401, "this is not your event");
    }
    const event = await event_model_1.Event.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (payload.image && eventExist.image) {
        await (0, cloudinary_config_1.cloudinaryDeleteUpload)(eventExist.image);
    }
    return event;
};
const getOwnEventForHost = async (hostId, query) => {
    const searchTerm = query?.searchTerm;
    const { page = 1, limit = 10 } = query;
    const filters = { host: hostId };
    Object.keys(query || {}).forEach((key) => {
        if (!["searchTerm", "page", "limit", "sortBy", "sortOrder"].includes(key)) {
            filters[key] = query[key];
        }
    });
    const eventsQuery = (0, queryBuilder_1.buildQuery)(event_model_1.Event, { searchTerm, filters }, query).populate("host", "name email profileImage role")
        .populate({
        path: "participants",
        populate: {
            path: "user",
            select: "name email",
        },
    });
    ;
    const result = await eventsQuery.exec();
    const total = await event_model_1.Event.countDocuments({ host: hostId });
    return { total, result, page,
        limit, };
};
const getAllEventForAdmin = async (query) => {
    const searchTerm = query?.searchTerm;
    const { page = 1, limit = 10 } = query;
    const filters = {};
    Object.keys(query || {}).forEach((key) => {
        if (!["searchTerm", "page", "limit", "sortBy", "sortOrder"].includes(key)) {
            filters[key] = query[key];
        }
    });
    const eventsQuery = (0, queryBuilder_1.buildQuery)(event_model_1.Event, { searchTerm, filters }, query).populate("host", "name email profileImage role ratingAvg")
        .populate({
        path: "participants",
        populate: {
            path: "user",
            select: "name email",
        },
    });
    ;
    ;
    ;
    const result = await eventsQuery.exec();
    const total = await event_model_1.Event.countDocuments(filters);
    return { total, result, page, limit };
};
const getAllEventForUser = async (query) => {
    const searchTerm = query?.searchTerm;
    const filters = { status: "OPEN" };
    Object.keys(query || {}).forEach((key) => {
        if (!["searchTerm", "page", "limit", "sortBy", "sortOrder"].includes(key)) {
            filters[key] = query[key];
        }
    });
    const eventsQuery = (0, queryBuilder_1.buildQuery)(event_model_1.Event, { searchTerm, filters }, query).populate("host", "name email profileImage role")
        .populate({
        path: "participants",
        populate: {
            path: "user",
            select: "name email",
        },
    });
    ;
    ;
    const result = await eventsQuery.exec();
    const total = await event_model_1.Event.countDocuments(filters);
    return { total, result };
};
const getAllJoinedEventForUser = async (userId) => {
    const participations = await participants_model_1.Participation.find({ user: userId }).select("event");
    if (participations.length === 0) {
        throw new AppError_1.default(404, "You have no participation in any events");
    }
    const eventIds = participations.map((p) => p.event);
    const now = new Date();
    const pastEvents = await event_model_1.Event.find({
        _id: { $in: eventIds },
        date: { $lt: now },
    }).sort({ date: -1 });
    return pastEvents;
};
const getAllPendingPaymentsForUser = async (userId) => {
    const participations = await participants_model_1.Participation.find({
        user: userId,
        status: participants_interface_1.participantsStatus.JOINED,
        paymentStatus: { $ne: payment_interface_1.PaymentStatus.PAID },
    }).populate("event");
    if (!participations || participations.length === 0) {
        throw new AppError_1.default(404, "No pending payment events found");
    }
    const events = participations.map((p) => ({
        participationId: p._id,
        paymentStatus: p.paymentStatus,
        event: p.event,
    }));
    return events;
};
exports.getAllPendingPaymentsForUser = getAllPendingPaymentsForUser;
//   const getSingleEvent = async (id: string) => {
//     const event = await Event.findById(id)
//       .populate({path:"host", select:"-password"})
//       .populate({
//         path: "participants",
//         populate: {
//           path: "user",
//           select: "name email"
//         }
//       });
//     if (!event) throw new Error("Event not found");
//     return event;
//   };
const getSingleEvent = async (id) => {
    const event = await event_model_1.Event.findById(id)
        .populate({
        path: "host",
        select: "-password"
    })
        .populate({
        path: "participants",
        options: { strictPopulate: false },
        populate: {
            path: "user",
            select: "name email",
            options: { strictPopulate: false }
        }
    });
    if (!event)
        throw new Error("Event not found");
    return event;
};
const deleteEvent = async (hostId, eventId) => {
    const event = await event_model_1.Event.findById(eventId);
    if (!event) {
        throw new AppError_1.default(401, "event not found");
    }
    const host = new mongoose_1.default.Types.ObjectId(hostId);
    if (!event.host.equals(host)) {
        throw new AppError_1.default(401, "this is not your event");
    }
    const eventDelete = await event_model_1.Event.findByIdAndDelete(eventId);
    await (0, cloudinary_config_1.cloudinaryDeleteUpload)(event.image);
    return eventDelete;
};
const viewParticipants = async (eventId, query) => {
    const page = parseInt(query?.page) || 1;
    const limit = parseInt(query?.limit) || 10;
    const skip = (page - 1) * limit;
    const searchTerm = query?.searchTerm;
    const match = { event: new mongoose_1.default.Types.ObjectId(eventId) };
    Object.keys(query || {}).forEach((key) => {
        if (!["searchTerm", "page", "limit", "sortBy", "sortOrder"].includes(key)) {
            match[key] = query[key];
        }
    });
    const pipeline = [
        { $match: match },
        { $lookup: { from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user" } },
        { $unwind: "$user" },
    ];
    if (searchTerm) {
        pipeline.push({
            $match: {
                $or: [
                    { "user.name": { $regex: searchTerm, $options: "i" } },
                    { "user.email": { $regex: searchTerm, $options: "i" } },
                ],
            },
        });
    }
    const totalPipeline = [...pipeline, { $count: "total" }];
    const totalResult = await participants_model_1.Participation.aggregate(totalPipeline);
    const total = totalResult[0]?.total || 0;
    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });
    const participants = await participants_model_1.Participation.aggregate(pipeline);
    return {
        total,
        page,
        limit,
        participants,
    };
};
const getAllEventsRevenue = async (hostId) => {
    // 1. Fetch all events hosted by the host
    const events = await event_model_1.Event.find({ host: hostId });
    if (!events.length) {
        return [];
    }
    // 2. Prepare aggregation for payments per event
    const payments = await payment_model_1.Payment.aggregate([
        {
            $match: {
                event: { $in: events.map((e) => e._id) },
                status: "PAID",
            },
        },
        {
            $group: {
                _id: "$event",
                totalRevenue: { $sum: "$amount" },
                totalTransactions: { $sum: 1 },
                users: { $addToSet: "$user" },
            },
        },
    ]);
    // 3. Map results per event
    const revenueData = events.map((event) => {
        const payment = payments.find((p) => p._id.toString() === event._id.toString());
        return {
            eventId: event._id,
            eventName: event.name,
            totalRevenue: payment?.totalRevenue || 0,
            totalTransactions: payment?.totalTransactions || 0,
            totalParticipantsPaid: payment?.users.length || 0,
        };
    });
    return revenueData;
};
exports.eventService = { createEvent, updateEvent, getOwnEventForHost, getAllEventForAdmin, getAllEventForUser, getAllJoinedEventForUser, getSingleEvent, deleteEvent, viewParticipants, getAllEventsRevenue, getAllPendingPaymentsForUser: exports.getAllPendingPaymentsForUser };
//# sourceMappingURL=event.service.js.map