import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"
import httpStatus from "http-status-codes"
import { cloudinaryDeleteUpload } from "../../config/cloudinary.config";

const createUser =async (payload: Partial<IUser>)=>{

    const {email, password,...rest } = payload

    if (!email) {
        throw new Error("Email is required");
      }

    const userExist = await User.findOne({email})

    if(userExist){
        throw new AppError(401, "email already exist")
    }

    const hashPassword = await bcryptjs.hash(password as string, Number(envVars.HASH_SALT ));


   

    const user = await User.create({
        
        email,
        password: hashPassword,
       
        ...rest
    })

    return user;


}

const getAllUser = async (query: any)=>{

    const { page = 1, limit = 10, search = "", role } = query;

    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    if (role) filter.role = role;

    const skip = (Number(page) - 1) * Number(limit);

    const [users, total] = await Promise.all([
      User.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      User.countDocuments(filter),
    ]);

    return {
      data: users,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    };
}

const blockUser = async(userId: string)=>{
    const user = await User.findById(userId);
    if (!user) throw new AppError(404, "User not found");

    user.isBlocked = true;
    await user.save();

    return user;
}
const unBlockUser = async(userId: string)=>{

    const user = await User.findById(userId);
    if (!user) throw new AppError(404, "User not found");

    user.isBlocked = false;
    await user.save();

    return user;
}
const getSingleUser = async (userId: string)=>{

    const user = await User.findById(userId).select("-password");

    return user

}

const updateUser = async(userId: string, payload: Partial<IUser>, decodeToken: JwtPayload)=>{

    if(decodeToken.role===Role.USER|| decodeToken.role === Role.HOST){
        if(userId !== decodeToken.userId){
            throw new AppError(httpStatus.FORBIDDEN, "you cannot update this")
        }
    }
  
    const findUser = await User.findById(userId)

    if(!findUser){
        throw new AppError(httpStatus.NOT_FOUND, "user not found")
    }

    if(decodeToken.role === Role.ADMIN && findUser.role===Role.SUPERADMIN){
        throw new AppError(httpStatus.FORBIDDEN, "you are not authorized")
    }

    if(payload.role){
        if(decodeToken.role === Role.USER || decodeToken.role === Role.HOST){
            throw new AppError(httpStatus.FORBIDDEN, "you are not authorized")
        }

        // if(payload.role === Role.SUPERADMIN || decodeToken.role === Role.ADMIN){
        //     throw new AppError(httpStatus.FORBIDDEN, "you are not authorized")
        // }
    }

    if(  payload.isBlocked){
        if(decodeToken.role === Role.USER || decodeToken.role === Role.HOST){
            throw new AppError(httpStatus.FORBIDDEN, "you are not authorized")
        }
    }

 

    const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {new: true, runValidators: true})

    if(payload.profileImage && findUser.profileImage){
        await cloudinaryDeleteUpload(findUser.profileImage);
    }

    return newUpdateUser;
    

}

const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    if (!user) return null;
  
 
  
    return user
  };


  const becomeHost = async (userId: string)=>{

  const user = await User.findById(userId)

  if(user?.role !== Role.USER){
    throw new AppError(401, "you cannot become host")
  }

    const updateUser = await User.findByIdAndUpdate(userId, { isHostRequest: true}, {new: true})

    return updateUser
  }
  
  const approveHost = async (userId: string)=>{

  const user = await User.findById(userId)

  if(!user){
    throw new AppError(401, "user not found")
  }

    const updateUser = await User.findByIdAndUpdate(userId, { isHostRequest: false, role: Role.HOST, isHostApproved: true}, {new: true})

    return updateUser
  }

  const getAllHostRequest = async ()=>{

    const hostRequest = await User.find({isHostRequest: true, isHostApproved: false, role: Role.USER})

    return hostRequest
  }
  
  



export const userService = 
{
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    getMe,
    blockUser,
    unBlockUser,
    becomeHost,
    approveHost,
    getAllHostRequest
}