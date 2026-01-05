"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const rating_model_1 = require("./rating.model");
const participants_model_1 = require("../participants/participants.model");
const participants_interface_1 = require("../participants/participants.interface");
const event_model_1 = require("../events/event.model");
const user_model_1 = require("../user/user.model");
const rateHost = async (userId, payload) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { hostId, eventId, stars } = payload;
        const event = await event_model_1.Event.findOne({ _id: eventId, host: hostId }).session(session);
        if (!event)
            throw new AppError_1.default(403, "This event does not belong to this host");
        const participation = await participants_model_1.Participation.findOne({
            event: eventId,
            user: userId,
            paymentStatus: participants_interface_1.participantsPaymentStatus.PAID,
        }).session(session);
        if (!participation)
            throw new AppError_1.default(403, "Only paid participants can rate the host");
        const existingRating = await rating_model_1.Rating.findOne({
            user: userId,
            event: eventId,
        }).session(session);
        if (existingRating)
            throw new AppError_1.default(400, "You have already rated this event/host");
        const rating = await rating_model_1.Rating.create([
            {
                user: new mongoose_1.default.Types.ObjectId(userId),
                host: new mongoose_1.default.Types.ObjectId(hostId),
                event: new mongoose_1.default.Types.ObjectId(eventId),
                stars,
            },
        ], { session });
        const hostRatings = await rating_model_1.Rating.aggregate([
            { $match: { host: new mongoose_1.default.Types.ObjectId(hostId) } },
            { $group: { _id: null, avgRating: { $avg: "$stars" } } },
        ]).session(session);
        const newAvgRating = hostRatings.length > 0 ? hostRatings[0].avgRating : 0;
        await user_model_1.User.findByIdAndUpdate(hostId, { ratingAvg: newAvgRating }, { session });
        await session.commitTransaction();
        session.endSession();
        return {
            message: "Rating submitted successfully",
            rating,
            hostNewRating: newAvgRating,
        };
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const getHostRatings = async (hostId) => {
    const host = await user_model_1.User.findById(hostId);
    if (!host)
        throw new AppError_1.default(404, "Host not found");
    const ratings = await rating_model_1.Rating.find({ host: hostId })
        .populate({ path: "user", select: "name email" })
        .populate({ path: "event", select: "name date" })
        .sort({ createdAt: -1 });
    const avgRating = ratings.length
        ? ratings.reduce((sum, r) => sum + r.stars, 0) / ratings.length
        : 0;
    return {
        totalRatings: ratings.length,
        averageRating: avgRating,
        ratings,
    };
};
const getHostAverageRating = async (hostId) => {
    const host = await user_model_1.User.findById(hostId).select("name ratingAvg");
    if (!host)
        throw new AppError_1.default(404, "Host not found");
    return {
        //   hostId: host._id,
        //   hostName: host.name,
        averageRating: host.ratingAvg || 0,
    };
};
exports.ratingService = { rateHost, getHostRatings, getHostAverageRating };
//# sourceMappingURL=rating.service.js.map