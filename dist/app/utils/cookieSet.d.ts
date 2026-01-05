import { Response } from "express";
interface AuthToken {
    accessToken?: string;
    refreshToken?: string;
}
export declare const setCookies: (res: Response, tokenInfo: AuthToken) => void;
export {};
//# sourceMappingURL=cookieSet.d.ts.map