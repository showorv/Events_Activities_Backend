import { Router } from "express";
import { userController } from "./user.controller";
import { validateSchma } from "../../middlewares/validationSchema";
import { createUserValidation } from "./user.validation";

const router = Router()

router.post("/create",validateSchma(createUserValidation), userController.createUser)

export const userRouter = router