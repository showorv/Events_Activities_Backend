import { Router } from "express";
import { paymentController } from "./payment.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";


const router = Router()

router.post("/init-payment/:eventId",checkAuth(...Object.values(Role)), paymentController.initPayment)
router.post("/success", paymentController.paymentSuccess)
router.post("/fail", paymentController.paymentFail)
router.post("/cancel", paymentController.paymentCancel)
router.post("/validate-payment", paymentController.validatePayment)


export const paymentRouter = router;