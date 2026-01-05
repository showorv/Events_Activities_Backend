"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_router_1 = require("../modules/user/user.router");
const auth_router_1 = require("../modules/auth/auth.router");
const event_router_1 = require("../modules/events/event.router");
const participants_router_1 = require("../modules/participants/participants.router");
const payment_router_1 = require("../modules/payment/payment.router");
const rating_router_1 = require("../modules/rating/rating.router");
const contact_route_1 = require("../modules/contact/contact.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_router_1.userRouter
    },
    {
        path: "/auth",
        route: auth_router_1.authRouter
    },
    {
        path: "/event",
        route: event_router_1.eventRouter
    },
    {
        path: "/participation",
        route: participants_router_1.participationRouter
    },
    {
        path: "/payment",
        route: payment_router_1.paymentRouter
    },
    {
        path: "/rating",
        route: rating_router_1.rateRouter
    },
    {
        path: "/contact",
        route: contact_route_1.contactRouter
    },
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
//# sourceMappingURL=index.js.map