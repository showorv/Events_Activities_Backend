import { IUser } from "../user/user.interface";
import { JwtPayload } from "jsonwebtoken";
export declare const authService: {
    createLoginService: (payload: Partial<IUser>) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            role: import("../user/user.interface").Role;
            bio?: string;
            location?: string;
            interests?: string[];
            profileImage?: string;
            ratingAvg?: number;
            hostedEvents?: import("mongoose").Types.ObjectId[];
            joinedEvents?: import("mongoose").Types.ObjectId[];
            isVerified: boolean;
            isBlocked: boolean;
            isHostRequest?: boolean;
            isHostApproved?: boolean;
            createdAt?: Date;
            updatedAt?: Date;
            __v: number;
        };
    }>;
    changePassword: (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => Promise<void>;
};
//# sourceMappingURL=auth.service.d.ts.map