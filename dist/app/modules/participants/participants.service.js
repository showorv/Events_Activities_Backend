"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.participationService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const event_interface_1 = require("../events/event.interface");
const event_model_1 = require("../events/event.model");
const participants_interface_1 = require("./participants.interface");
const participants_model_1 = require("./participants.model");
const joinEvent = async (userId, eventId) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const event = await event_model_1.Event.findById(eventId).session(session);
        if (!event) {
            throw new Error("Event not found");
        }
        if (event.status !== event_interface_1.Status.OPEN) {
            throw new Error("This event is not open for joining");
        }
        const alreadyJoined = await participants_model_1.Participation.findOne({ user: userId, event: eventId }).session(session);
        if (alreadyJoined) {
            if (alreadyJoined.paymentStatus === participants_interface_1.participantsPaymentStatus.PAID) {
                throw new Error("You have already joined and paid for this event");
            }
            return alreadyJoined; // if not paid then can paid here
        }
        const currentCount = await participants_model_1.Participation.countDocuments({ event: eventId, status: "JOINED" }).session(session);
        if (event.maxParticipants && currentCount >= event.maxParticipants) {
            throw new Error("Event is full");
        }
        const participation = await participants_model_1.Participation.create([
            {
                user: userId,
                event: eventId,
                paymentStatus: event.joiningFee > 0 ? participants_interface_1.participantsPaymentStatus.PENDING : participants_interface_1.participantsPaymentStatus.PAID,
            },
        ], { session });
        event.participants.push(participation[0]._id);
        await event.save({ session });
        await session.commitTransaction();
        session.endSession();
        return participation[0];
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
const leaveEvent = async (userId, eventId) => {
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const participation = await participants_model_1.Participation.findOne({ user: userId, event: eventId }).session(session);
        if (!participation) {
            throw new Error("You are not joined in this event");
        }
        if (participation.paymentStatus === participants_interface_1.participantsPaymentStatus.PAID) {
            throw new Error("You cannot leave this event as payment is completed");
        }
        await participants_model_1.Participation.deleteOne({ _id: participation._id }).session(session);
        await event_model_1.Event.findByIdAndUpdate(eventId, { $pull: { participants: participation._id } }, { session });
        await session.commitTransaction();
        session.endSession();
        return null;
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
exports.participationService = { joinEvent, leaveEvent };
//# sourceMappingURL=participants.service.js.map