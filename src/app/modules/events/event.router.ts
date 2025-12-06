import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { multerUpload } from "../../config/multer.config";
import { eventController } from "./event.controller";
import { validateSchma } from "../../middlewares/validationSchema";
import { createEventSchema, updateEventSchema } from "./event.validation";


const router = Router()

router.post("/create",checkAuth(Role.HOST),multerUpload.single("file"), validateSchma(createEventSchema), eventController.createEvent)



router.get("/hostEvent", checkAuth(Role.HOST), eventController.getOwnEventForHost)
router.get("/adminEvent", checkAuth(Role.ADMIN, Role.SUPERADMIN), eventController.getAllEventForAdmin)
router.get("/userEvent", checkAuth(...Object.values(Role)), eventController.getAllEventForUser)



router.get("/:id", checkAuth(...Object.values(Role)), eventController.getSingleEvent)

router.patch("/:id",checkAuth(Role.HOST),multerUpload.single("file"), validateSchma(updateEventSchema), eventController.updateEvent)


export const eventRouter = router