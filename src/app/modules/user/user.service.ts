import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs"

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

export const userService = {createUser}