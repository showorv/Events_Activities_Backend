import { Request, Response } from "express";
export declare const eventController: {
    createEvent: (req: Request, res: Response, next: import("express").NextFunction) => void;
    updateEvent: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getOwnEventForHost: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getAllEventForAdmin: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getAllEventForUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getAllJoinedEventForUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getSingleEvent: (req: Request, res: Response, next: import("express").NextFunction) => void;
    deleteEvent: (req: Request, res: Response, next: import("express").NextFunction) => void;
    viewParticipants: (req: Request, res: Response, next: import("express").NextFunction) => void;
    eventRevenue: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getAllPendingPaymentsForUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
};
//# sourceMappingURL=event.controller.d.ts.map