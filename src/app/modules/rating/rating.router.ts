import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { rateController } from "./rating.controller";


const router = Router()

router.post ("/rate", checkAuth(Role.USER), rateController.rateHost)
router.get ("/getRating", checkAuth(Role.HOST), rateController.getHostRatings)

router.get ("/:hostId", checkAuth(...Object.values(Role)), rateController.getHostAverageRating)

export const rateRouter = router