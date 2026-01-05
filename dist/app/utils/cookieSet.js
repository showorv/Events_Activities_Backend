"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookies = void 0;
const setCookies = (res, tokenInfo) => {
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            // secure: envVars.NODE_ENV==="development"?false: true,
            // secure: envVars.NODE_ENV !== "development",
            secure: true,
            sameSite: "none"
        });
    }
    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            httpOnly: true, // eta na dile frontend e cookie set hbe na
            // secure: false // eta na dile frontend e cookie access korte dibe na cors er karone
            // secure: envVars.NODE_ENV !== "development",
            secure: true,
            sameSite: "none"
        });
    }
};
exports.setCookies = setCookies;
//# sourceMappingURL=cookieSet.js.map