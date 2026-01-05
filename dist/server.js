"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
const seed_1 = require("./app/seed/seed");
// import { superAdmin } from "./app/seed/seed";
// import { connectRedis } from "./app/config/redis.config";
let server;
async function main() {
    try {
        // console.log(envVars.NODE_ENV);
        await mongoose_1.default.connect(env_1.envVars.MONGODB_URL);
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`Server listening at ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
(async () => {
    // await connectRedis()
    await main();
    await (0, seed_1.superAdmin)();
})();
// server error handle and server off
process.on("unhandledRejection", (err) => {
    console.log("unhandle rejection detected... server shutting down..", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.log("uncaught exception detected... server shutting down..", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("SIGTERM", () => {
    console.log("sigterm signal recived... server shutting down..");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("SIGINT", () => {
    console.log("sigintsignal recived... server shutting down..");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
//# sourceMappingURL=server.js.map