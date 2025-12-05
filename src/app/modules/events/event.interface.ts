import { Types } from "mongoose";

export enum Status  {
    OPEN= "OPEN",
    FULL="FULL",
    CANCELLED="CANCELLED",
    COMPLETED="COMPLETED"
}

export interface IEvent {
  _id?: Types.ObjectId;

  host: Types.ObjectId;

  name: string;
  type: string;

  date: Date;
  time: string;

  location: string;

  minParticipants: number;
  maxParticipants: number;

  joiningFee?: number;
  description?: string;
  image?: string;

  status?: Status;

  participants?: Types.ObjectId[];

  createdAt?: Date;
  updatedAt?: Date;
}
