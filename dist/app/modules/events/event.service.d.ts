import mongoose, { Types } from "mongoose";
import { IEvent } from "./event.interface";
export declare const getAllPendingPaymentsForUser: (userId: string) => Promise<{
    participationId: Types.ObjectId;
    paymentStatus: import("../participants/participants.interface").participantsPaymentStatus | undefined;
    event: Types.ObjectId;
}[]>;
export declare const eventService: {
    createEvent: (hostId: string, payload: Partial<IEvent>) => Promise<mongoose.Document<unknown, {}, IEvent, {}, mongoose.DefaultSchemaOptions> & IEvent & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateEvent: (id: string, hostId: string, payload: Partial<IEvent>) => Promise<(mongoose.Document<unknown, {}, IEvent, {}, mongoose.DefaultSchemaOptions> & IEvent & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getOwnEventForHost: (hostId: string, query: any) => Promise<{
        total: number;
        result: any;
        page: any;
        limit: any;
    }>;
    getAllEventForAdmin: (query: any) => Promise<{
        total: number;
        result: any;
        page: any;
        limit: any;
    }>;
    getAllEventForUser: (query: any) => Promise<{
        total: number;
        result: any;
    }>;
    getAllJoinedEventForUser: (userId: string) => Promise<(mongoose.Document<unknown, {}, IEvent, {}, mongoose.DefaultSchemaOptions> & IEvent & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getSingleEvent: (id: string) => Promise<mongoose.Document<unknown, {}, IEvent, {}, mongoose.DefaultSchemaOptions> & IEvent & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    deleteEvent: (hostId: string, eventId: string) => Promise<(mongoose.Document<unknown, {}, IEvent, {}, mongoose.DefaultSchemaOptions> & IEvent & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    viewParticipants: (eventId: string, query: any) => Promise<{
        total: any;
        page: number;
        limit: number;
        participants: any[];
    }>;
    getAllEventsRevenue: (hostId: string) => Promise<{
        eventId: Types.ObjectId;
        eventName: string;
        totalRevenue: any;
        totalTransactions: any;
        totalParticipantsPaid: any;
    }[]>;
    getAllPendingPaymentsForUser: (userId: string) => Promise<{
        participationId: Types.ObjectId;
        paymentStatus: import("../participants/participants.interface").participantsPaymentStatus | undefined;
        event: Types.ObjectId;
    }[]>;
};
//# sourceMappingURL=event.service.d.ts.map