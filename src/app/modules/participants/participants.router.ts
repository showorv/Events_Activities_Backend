import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { participationController } from "./participants.controller";


const router = Router()

router.post("/join/:id" , checkAuth(...Object.values(Role)), participationController.joinEvent)
router.post("/leave/:id" , checkAuth(...Object.values(Role)), participationController.leaveEvent)

export const participationRouter = router