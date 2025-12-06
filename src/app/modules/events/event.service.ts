import mongoose from "mongoose"
import AppError from "../../errorHelpers/AppError"
import { IEvent } from "./event.interface"
import { Event } from "./event.model"
import { cloudinaryDeleteUpload } from "../../config/cloudinary.config"
import { buildQuery } from "../../utils/queryBuilder"

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

    console.log("host",host);
    console.log("event host",eventExist.host);
    

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
    );
  
    const result = await eventsQuery.exec();
    const total = await Event.countDocuments({ host: hostId });
  
    return { total, result };
  };
  
  const getAllEventForAdmin = async (query: any) => {
    const searchTerm = query?.searchTerm;
  
  
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
    );
  
    const result = await eventsQuery.exec();
    const total = await Event.countDocuments(filters);
  
    return { total, result };
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
    );
  
    const result = await eventsQuery.exec();
    const total = await Event.countDocuments(filters);
  
    return { total, result };
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
  










export const eventService = {createEvent, updateEvent, getOwnEventForHost, getAllEventForAdmin,getAllEventForUser,getSingleEvent}