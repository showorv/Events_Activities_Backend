import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { multerUpload } from "../../config/multer.config";
import { eventController } from "./event.controller";
import { validateSchma } from "../../middlewares/validationSchema";
import { createEventSchema } from "./event.validation";


const router = Router()

router.post("/create",checkAuth(Role.HOST),multerUpload.single("file"), validateSchma(createEventSchema), eventController.createEvent)


export const eventRouter = router