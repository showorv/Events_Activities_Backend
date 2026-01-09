"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { globalError } from "./app/middlewares/globalErrorHandle"
// import { routeNotFound } from "./app/middlewares/routeNotFound"
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const route_1 = require("./app/route");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const routeNotFound_1 = require("./app/middlewares/routeNotFound");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ["https://events-activities-frontend-ochre.vercel.app", "http://localhost:3000"],
    credentials: true
}));
app.use("/api/v1", route_1.router);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Events & Activites backend"
    });
});
// route not found
app.use(routeNotFound_1.routeNotFound);
app.use(globalErrorHandler_1.globalError);
exports.default = app;
//# sourceMappingURL=app.js.map