import { NextFunction, Request, Response } from "express";
type asyncHandle = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const catchAsyncError: (fn: asyncHandle) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=catchAsyncError.d.ts.map