import { Request, Response } from "express";
export declare const paymentController: {
    paymentFail: (req: Request, res: Response, next: import("express").NextFunction) => void;
    paymentSuccess: (req: Request, res: Response, next: import("express").NextFunction) => void;
    paymentCancel: (req: Request, res: Response, next: import("express").NextFunction) => void;
    initPayment: (req: Request, res: Response, next: import("express").NextFunction) => void;
    validatePayment: (req: Request, res: Response, next: import("express").NextFunction) => void;
};
//# sourceMappingURL=payment.controller.d.ts.map