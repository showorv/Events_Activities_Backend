import mongoose from "mongoose";
export declare const participationService: {
    joinEvent: (userId: string, eventId: string) => Promise<(mongoose.Document<unknown, {}, import("./participants.interface").IParticipants, {}, mongoose.DefaultSchemaOptions> & import("./participants.interface").IParticipants & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | undefined>;
    leaveEvent: (userId: string, eventId: string) => Promise<null>;
};
//# sourceMappingURL=participants.service.d.ts.map