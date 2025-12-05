import { Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";


const router = Router()

router.post("/login", authController.createLogin)

router.post("/logout", authController.logout)
router.post("/change-password",checkAuth(...Object.values(Role)), authController.changePassword)


export const authRouter = router