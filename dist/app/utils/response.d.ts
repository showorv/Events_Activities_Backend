import { Response } from "express";
interface TMeta {
    total: number;
}
interface TResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
    metaData?: TMeta;
}
export declare const sendResponse: <T>(res: Response, data: TResponse<T>) => void;
export {};
//# sourceMappingURL=response.d.ts.map