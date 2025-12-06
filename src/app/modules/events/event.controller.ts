import { Request, Response } from "express";
import { catchAsyncError } from "../../utils/catchAsyncError";
import { sendResponse } from "../../utils/response";
import { eventService } from "./event.service";
import { IEvent } from "./event.interface";
import { JwtPayload } from "jsonwebtoken";

const createEvent = catchAsyncError (async( req: Request, res: Response)=>{

    const decodedToken = req.user as JwtPayload

    const payload: IEvent = {
        ...req.body,
       
        image: req.file?.path
        
    }
    const result = await eventService.createEvent(decodedToken.userId,payload);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message:  "event created successfully",
        data: result,
       
})

})
const updateEvent = catchAsyncError (async( req: Request, res: Response)=>{

    const decodedToken = req.user as JwtPayload

    const payload: IEvent = {
        ...req.body,
       
        image: req.file?.path
        
    }

    const id = req.params.id as string
    const result = await eventService.updateEvent(id,decodedToken.userId,payload);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message:  "event updated successfully",
        data: result,
       
})

})


 const getOwnEventForHost = catchAsyncError(async (req, res) => {

    const decodedToken = req.user;
  
    const result = await eventService.getOwnEventForHost(decodedToken.userId, req.query);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Host events fetched successfully",
      data: result,
    });
  });


 const getAllEventForAdmin = catchAsyncError(async (req, res) => {
    const result = await eventService.getAllEventForAdmin(req.query);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All events fetched successfully",
      data: result,
    });
  });

 const getAllEventForUser = catchAsyncError(async (req, res) => {
    const result = await eventService.getAllEventForUser(req.query);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Events fetched successfully",
      data: result,
    });
  });

const getSingleEvent = catchAsyncError(async (req, res) => {
    const { id } = req.params;
  
    const result = await eventService.getSingleEvent(id as string);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "single event fetched successfully",
      data: result,
    });
  });

  const deleteEvent = catchAsyncError (async( req: Request, res: Response)=>{

    const decodedToken = req.user as JwtPayload

   const id = req.params.id as string

    const result = await eventService.deleteEvent(decodedToken.userId,id);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message:  "event deleted successfully",
        data: result,
       
})

})
  const viewParticipants = catchAsyncError (async( req: Request, res: Response)=>{



   const id = req.params.id as string

    const result = await eventService.viewParticipants(id, req.query);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message:  "participants fetched successfully",
        data: result,
       
})

})

export const eventController = {createEvent, updateEvent, getOwnEventForHost, getAllEventForAdmin,getAllEventForUser,getSingleEvent, deleteEvent, viewParticipants}
