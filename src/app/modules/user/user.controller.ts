import { catchAsyncError } from "../../utils/catchAsyncError";
import { sendResponse } from "../../utils/response";
import httpStatus from "http-status-codes"
import { IUser } from "./user.interface";
import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = catchAsyncError(async(req: Request,res: Response)=>{

    const payload: IUser = {
        ...req.body,
        // profileImage: req.file?.path
    }

    const user = await userService.createUser(payload);
    


    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message:  "User created successfully",
        data: user
    })
})

export const userController = {createUser}