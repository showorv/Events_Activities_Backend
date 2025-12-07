import mongoose from "mongoose";
import AppError from "../../errorHelpers/AppError";

import { Rating } from "./rating.model";
import { Participation } from "../participants/participants.model";
import { participantsPaymentStatus } from "../participants/participants.interface";
import { Event } from "../events/event.model";
import { User } from "../user/user.model";

const rateHost = async (
  userId: string,
  payload: { hostId: string; eventId: string; stars: number }
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { hostId, eventId, stars } = payload;

    
    const event = await Event.findOne({ _id: eventId, host: hostId }).session(session);
    if (!event) throw new AppError(403, "This event does not belong to this host");

   
    const participation = await Participation.findOne({
      event: eventId,
      user: userId,
      paymentStatus: participantsPaymentStatus.PAID,
    }).session(session);

    if (!participation) throw new AppError(403, "Only paid participants can rate the host");

  
    const existingRating = await Rating.findOne({
      user: userId,
      event: eventId,
    }).session(session);

    if (existingRating) throw new AppError(400, "You have already rated this event/host");

  
    const rating = await Rating.create(
      [
        {
          user: new mongoose.Types.ObjectId(userId),
          host: new mongoose.Types.ObjectId(hostId),
          event: new mongoose.Types.ObjectId(eventId),
          stars,
        },
      ],
      { session }
    );

    
    const hostRatings = await Rating.aggregate([
      { $match: { host: new mongoose.Types.ObjectId(hostId) } }, 
      { $group: { _id: null, avgRating: { $avg: "$stars" } } },
    ]).session(session);

    const newAvgRating = hostRatings.length > 0 ? hostRatings[0].avgRating : 0;

    await User.findByIdAndUpdate(hostId, { ratingAvg: newAvgRating }, { session });

    await session.commitTransaction();
    session.endSession();

    return {
      message: "Rating submitted successfully",
      rating,
      hostNewRating: newAvgRating,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


const getHostRatings = async (hostId: string) => {
 
  const host = await User.findById(hostId);
  if (!host) throw new AppError(404, "Host not found");

 
  const ratings = await Rating.find({ host: hostId })
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

const getHostAverageRating = async (hostId: string) => {
 
    const host = await User.findById(hostId).select("name ratingAvg");
    if (!host) throw new AppError(404, "Host not found");
  
    
    return {
    //   hostId: host._id,
    //   hostName: host.name,
      averageRating: host.ratingAvg || 0, 
    };
  };


export const ratingService = { rateHost ,getHostRatings, getHostAverageRating};
