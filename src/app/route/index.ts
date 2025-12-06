import { Router } from "express";
import { userRouter } from "../modules/user/user.router";
import { authRouter } from "../modules/auth/auth.router";
import { eventRouter } from "../modules/events/event.router";
import { participationRouter } from "../modules/participants/participants.router";



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
    
]

moduleRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})