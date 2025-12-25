import { catchAsyncError } from "../../utils/catchAsyncError";
import { sendResponse } from "../../utils/response";
import httpStatus from "http-status-codes"
import { IUser } from "./user.interface";
import { Request, Response } from "express";
import { userService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsyncError(async(req: Request,res: Response)=>{

    const payload: IUser = {
        ...req.body,
        profileImage: req.file?.path
    }

    const user = await userService.createUser(payload);
    


    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message:  "User created successfully",
        data: user
    })
})
const getAllUser = catchAsyncError (async( req: Request, res: Response)=>{

    const result = await userService.getAllUser(req.query);

    sendResponse(res,{
        statusCode: httpStatus.CREATED,
        success: true,
        message:  "User retrived successfully",
        data: result.data,
        metaData: result.meta 
})

   
})
const blockUser = catchAsyncError(async (req: Request, res: Response) => {
    const result = await userService.blockUser(req.params.userId as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user blocked successfully",
      data: result,
    });
  });

  const unblockUser = catchAsyncError(async (req: Request, res: Response) => {
    const result = await userService.unBlockUser(req.params.userId as string);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user unblocked successfully",
      data: result,
    });
  });

const getSingleUser = catchAsyncError (async( req: Request, res: Response)=>{

    const userId = req.params.userId

    const user = await userService.getSingleUser(userId as string)

    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "single user get successfully",
        data: user,
       
    })
   
})
const updateUser = catchAsyncError(async(req: Request,res: Response)=>{

    const userId = req.params.id
    
    const tokenVerified = req.user

    const payload: IUser = {
        ...req.body,
        profileImage: req.file?.path
    }

    const updateUser = await userService.updateUser(userId as string, payload, tokenVerified as JwtPayload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users updated successfully",
        data: updateUser,
       
    })
})

const getMe = catchAsyncError(async(req: Request,res: Response)=>{

    const decodedToken = req.user as JwtPayload

    const user = await userService.getMe(decodedToken.userId);
    

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "your profile retrived successfully",
        data: user,
       
    })
})

const becomeHost = catchAsyncError(async(req: Request,res: Response)=>{

    const decodedToken = req.user as JwtPayload

    const user = await userService.becomeHost(decodedToken.userId);
    

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "become host request sent successfully",
        data: user,
       
    })
})
const approveHost = catchAsyncError(async(req: Request,res: Response)=>{

    const userId = req.params.userId
    const user = await userService.becomeHost(userId as string);
    

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "approve host successfully",
        data: user,
       
    })
})
const getAllHostRequest = catchAsyncError(async(req: Request,res: Response)=>{


    const user = await userService.getAllHostRequest();
    

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "requested host get successfully",
        data: user,
       
    })
})


export const userController = 
{
    createUser,
    getAllUser, 
    getSingleUser,
    updateUser,
    getMe,
    blockUser,
    unblockUser,
    becomeHost,
    approveHost,
    getAllHostRequest
}