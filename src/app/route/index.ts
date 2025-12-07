import { Router } from "express";
import { userRouter } from "../modules/user/user.router";
import { authRouter } from "../modules/auth/auth.router";
import { eventRouter } from "../modules/events/event.router";
import { participationRouter } from "../modules/participants/participants.router";
import { paymentRouter } from "../modules/payment/payment.router";
import { rateRouter } from "../modules/rating/rating.router";



export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: userRouter
    },
    {
        path: "/auth",
        route: authRouter
    },
    {
        path: "/event",
        route: eventRouter
    },
    {
        path: "/participation",
        route: participationRouter
    },
    {
        path: "/payment",
        route: paymentRouter
    },
    {
        path: "/rating",
        route: rateRouter
    },
    
]

moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})