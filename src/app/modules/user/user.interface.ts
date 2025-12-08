import { Types } from "mongoose";

export enum Role {
    USER= "USER",
    HOST="HOST",
    ADMIN="ADMIN",
    SUPERADMIN="SUPERADMIN"

}

export interface IUser {
  _id?: Types.ObjectId;

  name: string;
  email: string;
  password: string;

  role: Role

  bio?: string;
  location?: string;
  interests?: string[];
  profileImage?: string;

  ratingAvg?: number;

  hostedEvents?: Types.ObjectId[];
  joinedEvents?: Types.ObjectId[];

  isVerified: boolean
  isBlocked: boolean
  isHostRequest?: boolean
  isHostApproved?: boolean

  createdAt?: Date;
  updatedAt?: Date;
}
