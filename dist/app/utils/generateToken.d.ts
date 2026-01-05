import jwt, { JwtPayload } from "jsonwebtoken";
export declare const generateToken: (payload: JwtPayload, secret: string, expiresIn: string) => string;
export declare const verifiedToken: (token: string, secret: string) => string | jwt.JwtPayload;
//# sourceMappingURL=generateToken.d.ts.map