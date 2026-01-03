import mongoose, { Types } from "mongoose"
import AppError from "../../errorHelpers/AppError"
import { IEvent } from "./event.interface"
import { Event } from "./event.model"
import { cloudinaryDeleteUpload } from "../../config/cloudinary.config"
import { buildQuery } from "../../utils/queryBuilder"
import { Participation } from "../participants/participants.model"
import { Payment } from "../payment/payment.model"
import { participantsStatus } from "../participants/participants.interface"
import { PaymentStatus } from "../payment/payment.interface"

const createEvent = async(hostId:string, payload: Partial<IEvent>)=> {

    if(!hostId){
        throw new AppError(402, "you cannot create event")
    }

    const eventPayload: Partial<IEvent> = {
        ...payload,
        host: new mongoose.Types.ObjectId(hostId), 
      };


    const event = await Event.create(eventPayload)

    return event;


}

const updateEvent = async(id:string,hostId: string, payload: Partial<IEvent>)=> {

    const eventExist = await Event.findById(id)

    if(!eventExist){
        throw new AppError(401, "event not found")
    }

    const host = new mongoose.Types.ObjectId(hostId)

 
    

    if (!eventExist.host.equals(host)) {
        throw new AppError(401, "this is not your event");
    }



    const event = await Event.findByIdAndUpdate(id, payload, {new: true, runValidators: true})

    if(payload.image && eventExist.image){
        await cloudinaryDeleteUpload(eventExist.image);
    }

    return event;


}

const getOwnEventForHost = async (hostId: string, query: any) => {

    const searchTerm = query?.searchTerm;
    const { page = 1, limit = 10 } = query;

  
    const filters: any = { host: hostId };
  
    Object.keys(query || {}).forEach((key) => {
      if (!["searchTerm", "page", "limit", "sortBy", "sortOrder"].includes(key)) {
        filters[key] = query[key];
      }
    });
  
    const eventsQuery = buildQuery(
      Event,
      { searchTerm, filters },
      query
    ).populate("host", "name email profileImage role")

   
    .populate({
      path: "participants",
      populate: {
        path: "user",
        select: "name email",
      },
    });;
  
    const result = await eventsQuery.exec();
    const total = await Event.countDocuments({ host: hostId });
  
    return { total, result, page,
      limit, };
  };
  
  const getAllEventForAdmin = async (query: any) => {
    const searchTerm = query?.searchTerm;
    const { page = 1, limit = 10 } = query;
  
    const filters: any = {};
  
    Object.keys(query || {}).forEach((key) => {
      if (!["searchTerm", "page", "limit", "sortBy", "sortOrder"].includes(key)) {
        filters[key] = query[key];
      }
    });
  
    const eventsQuery = buildQuery(
      Event,
      { searchTerm, filters },
      query
    ).populate("host", "name email profileImage role ratingAvg")

   
    .populate({
      path: "participants",
      populate: {
        path: "user",
        select: "name email",
      },
    });;;;
  
    const result = await eventsQuery.exec();
    const total = await Event.countDocuments(filters);
  
    return { total, result , page,limit};
  };
  

  const getAllEventForUser = async (query: any) => {
    const searchTerm = query?.searchTerm;
  
    const filters: any = { status: "OPEN" };
  
    Object.keys(query || {}).forEach((key) => {
      if (!["searchTerm", "page", "limit", "sortBy", "sortOrder"].includes(key)) {
        filters[key] = query[key];
      }
    });
  
    const eventsQuery = buildQuery(
      Event,
      { searchTerm, filters },
      query
    ).populate("host", "name email profileImage role")

   
    .populate({
      path: "participants",
      populate: {
        path: "user",
        select: "name email",
      },
    });;;
  
    const result = await eventsQuery.exec();
    const total = await Event.countDocuments(filters);
  
    return { total, result };
  };
  
  const getAllJoinedEventForUser = async (userId: string) => {

   
    const participations = await Participation.find({ user: userId }).select("event");
  
    if (participations.length === 0) {
      throw new AppError(404, "You have no participation in any events");
    }
  
    const eventIds = participations.map((p) => p.event);
  
    const now = new Date();
  
   
    const pastEvents = await Event.find({
      _id: { $in: eventIds },
      date: { $lt: now }, 
    }).sort({ date: -1 });
  
    return pastEvents;
  };
  
  

  export const getAllPendingPaymentsForUser = async (userId: string) => {
  
    const participations = await Participation.find({
      user: userId,
      status: participantsStatus.JOINED,
      paymentStatus: { $ne: PaymentStatus.PAID }, 
    }).populate("event"); 
  
    if (!participations || participations.length === 0) {
      throw new AppError(404, "No pending payment events found");
    }
  
    
    const events = participations.map((p) => ({
      participationId: p._id,
      paymentStatus: p.paymentStatus,
      event: p.event,
    }));
  
    return events;
  };
  

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

const getSingleEvent = async (id: string) => {
    const event = await Event.findById(id)
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
  
    if (!event) throw new Error("Event not found");
  
    return event;
  };
  

  const deleteEvent = async (hostId: string, eventId: string)=>{

    const event = await Event.findById(eventId)

    if(!event){
        throw new AppError(401, "event not found")
    }

    const host = new mongoose.Types.ObjectId(hostId)

    if (!event.host.equals(host)) {
        throw new AppError(401, "this is not your event");
    }


    const eventDelete = await Event.findByIdAndDelete(eventId)

    await cloudinaryDeleteUpload(event.image!)

    return eventDelete

  }


  const viewParticipants = async (eventId: string, query: any) => {
    const page = parseInt(query?.page) || 1;
    const limit = parseInt(query?.limit) || 10;
    const skip = (page - 1) * limit;
    const searchTerm = query?.searchTerm;
  
    const match: any = { event: new mongoose.Types.ObjectId(eventId) };
  
    
    Object.keys(query || {}).forEach((key) => {
      if (!["searchTerm", "page", "limit", "sortBy", "sortOrder"].includes(key)) {
        match[key] = query[key];
      }
    });
 
    const pipeline: any[] = [
      { $match: match },
      { $lookup: 
        { from: "users", 
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
    const totalResult = await Participation.aggregate(totalPipeline);
    const total = totalResult[0]?.total || 0;
  

    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });
  
    const participants = await Participation.aggregate(pipeline);
  
    return {
      total,
      page,
      limit,
      participants,
    };
  };


  const getAllEventsRevenue = async (hostId: string) => {
    // 1. Fetch all events hosted by the host
    const events = await Event.find({ host: hostId });
  
    if (!events.length) {
      return [];
    }
  
    // 2. Prepare aggregation for payments per event
    const payments = await Payment.aggregate([
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
  



export const eventService = {createEvent, updateEvent, getOwnEventForHost, getAllEventForAdmin,getAllEventForUser,getAllJoinedEventForUser,getSingleEvent,deleteEvent,viewParticipants, getAllEventsRevenue,getAllPendingPaymentsForUser}