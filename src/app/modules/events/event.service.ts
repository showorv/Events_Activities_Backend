import mongoose from "mongoose"
import AppError from "../../errorHelpers/AppError"
import { IEvent } from "./event.interface"
import { Event } from "./event.model"

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


export const eventService = {createEvent}