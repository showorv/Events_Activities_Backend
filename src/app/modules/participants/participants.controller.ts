import { JwtPayload } from "jsonwebtoken";
import { catchAsyncError } from "../../utils/catchAsyncError";
import { sendResponse } from "../../utils/response";
import { participationService } from "./participants.service";

const joinEvent = catchAsyncError(async (req, res) => {

    const decodedToken = req.user as JwtPayload

    const id = req.params.id as string

    const result = await participationService.joinEvent(decodedToken.userId, id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "join event successfully",
      data: result,
    });
  });

const leaveEvent = catchAsyncError(async (req, res) => {

    const decodedToken = req.user as JwtPayload

    const id = req.params.id as string

    const result = await participationService.leaveEvent(decodedToken.userId, id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "leave event successfully",
      data: result,
    });
  });



  export const participationController = {joinEvent, leaveEvent}