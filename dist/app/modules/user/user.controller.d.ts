import { Request, Response } from "express";
export declare const userController: {
    createUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getAllUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getSingleUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    updateUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getMe: (req: Request, res: Response, next: import("express").NextFunction) => void;
    blockUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    unblockUser: (req: Request, res: Response, next: import("express").NextFunction) => void;
    becomeHost: (req: Request, res: Response, next: import("express").NextFunction) => void;
    approveHost: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getAllHostRequest: (req: Request, res: Response, next: import("express").NextFunction) => void;
};
//# sourceMappingURL=user.controller.d.ts.map