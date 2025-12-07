import { Request, Response } from "express";
import { catchAsyncError } from "../../utils/catchAsyncError";
import { ratingService } from "./rating.service";
import { sendResponse } from "../../utils/response";

const rateHost = catchAsyncError(async (req: Request, res: Response) => {
    const userId = req.user.userId; // logged-in user
    const result = await ratingService.rateHost(userId, req.body);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Host rated successfully",
      data: result,
    });
  });

const getHostRatings = catchAsyncError(async (req: Request, res: Response) => {
    
    const userId = req.user.userId; 
    const result = await ratingService.getHostRatings(userId);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "get all rate for host successfully",
      data: result,
    });
  });

const getHostAverageRating = catchAsyncError(async (req: Request, res: Response) => {

    const hostId = req.params.hostId as string; 
    const result = await ratingService.getHostAverageRating(hostId);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "get host rate successfully",
      data: result,
    });
  });


  export const rateController = {rateHost,getHostRatings,getHostAverageRating}
  