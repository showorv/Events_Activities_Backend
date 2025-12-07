

import mongoose from "mongoose";
import { Status } from "../events/event.interface";
import { Event } from "../events/event.model";

import { participantsPaymentStatus } from "./participants.interface";
import { Participation } from "./participants.model";

const joinEvent = async (userId: string, eventId: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const event = await Event.findById(eventId).session(session);
      if (!event) {
        throw new Error("Event not found");
      }
  
      if (event.status !== Status.OPEN) {
        throw new Error("This event is not open for joining");
      }
  
      const alreadyJoined = await Participation.findOne({ user: userId, event: eventId }).session(session);
      if (alreadyJoined) {
        if (alreadyJoined.paymentStatus === participantsPaymentStatus.PAID) {
          throw new Error("You have already joined and paid for this event");
        }
      
        
        return alreadyJoined; // if not paid then can paid here
      }
      
  
      const currentCount = await Participation.countDocuments({ event: eventId, status: "JOINED" }).session(session);
  
      if (event.maxParticipants && currentCount >= event.maxParticipants) {
        throw new Error("Event is full");
      }
  
  
      const participation = await Participation.create(
        [
          {
            user: userId,
            event: eventId,
            paymentStatus: event.joiningFee! > 0 ? participantsPaymentStatus.PENDING : participantsPaymentStatus.PAID,
          },
        ],
        { session }
      );
  
     
      event.participants!.push(participation[0]!._id);
      await event.save({ session });
  
   
      await session.commitTransaction();
      session.endSession();
  
      return participation[0];
    } catch (error) {

      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };



  
 const leaveEvent = async (userId: string, eventId: string) => {

    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
     
      const participation = await Participation.findOne({ user: userId, event: eventId }).session(session);
      if (!participation) {
        throw new Error("You are not joined in this event");
      }
  
      
      if (participation.paymentStatus === participantsPaymentStatus.PAID) {
        throw new Error("You cannot leave this event as payment is completed");
      }
  
  
      await Participation.deleteOne({ _id: participation._id }).session(session);
  
  
      await Event.findByIdAndUpdate(
        eventId,
        { $pull: { participants: participation._id } },
        { session }
      );
  
      
      await session.commitTransaction();
      session.endSession();
  
      return null;

    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };
  

  

export const participationService = {joinEvent, leaveEvent}