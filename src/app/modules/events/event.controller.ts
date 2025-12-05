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


export const eventController = {createEvent}
