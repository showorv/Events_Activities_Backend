import mongoose from "mongoose";
export declare const ratingService: {
    rateHost: (userId: string, payload: {
        hostId: string;
        eventId: string;
        stars: number;
    }) => Promise<{
        message: string;
        rating: (mongoose.Document<unknown, {}, import("./rating.interface").IRating, {}, mongoose.DefaultSchemaOptions> & import("./rating.interface").IRating & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
        hostNewRating: any;
    }>;
    getHostRatings: (hostId: string) => Promise<{
        totalRatings: number;
        averageRating: number;
        ratings: (mongoose.Document<unknown, {}, import("./rating.interface").IRating, {}, mongoose.DefaultSchemaOptions> & import("./rating.interface").IRating & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    getHostAverageRating: (hostId: string) => Promise<{
        averageRating: number;
    }>;
};
//# sourceMappingURL=rating.service.d.ts.map