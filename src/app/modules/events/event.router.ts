import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { multerUpload } from "../../config/multer.config";
import { eventController } from "./event.controller";

import { createEventSchema, updateEventSchema } from "./event.validation";
import { validateSchema } from "../../middlewares/validationSchema";


const router = Router()

router.post("/create",checkAuth(Role.HOST),multerUpload.single("file"), validateSchema(createEventSchema), eventController.createEvent)



router.get("/hostEvent", checkAuth(Role.HOST), eventController.getOwnEventForHost)
router.get("/adminEvent", checkAuth(Role.ADMIN, Role.SUPERADMIN), eventController.getAllEventForAdmin)
router.get("/userEvent",  eventController.getAllEventForUser)
router.get("/userJoinedEvent", checkAuth(Role.USER), eventController.getAllJoinedEventForUser)
router.get("/pendingPaymentEvent", checkAuth(Role.USER), eventController.getAllPendingPaymentsForUser)
router.get("/revenue", checkAuth(Role.HOST), eventController.eventRevenue)


router.get("/:id", eventController.getSingleEvent)

router.get("/view/:id", checkAuth(Role.HOST, Role.SUPERADMIN, Role.ADMIN), eventController.viewParticipants)


router.patch("/:id",checkAuth(Role.HOST),multerUpload.single("file"), validateSchema(updateEventSchema), eventController.updateEvent)

router.delete("/:id",checkAuth(Role.HOST), eventController.deleteEvent)


export const eventRouter = router