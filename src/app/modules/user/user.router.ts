import { Router } from "express";
import { userController } from "./user.controller";
import { validateSchma } from "../../middlewares/validationSchema";
import { createUserValidation, updateUserValidation } from "./user.validation";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router()

router.post("/create",multerUpload.single("file"), validateSchma(createUserValidation), userController.createUser)

router.get ("/",
checkAuth(Role.ADMIN, Role.SUPERADMIN), 
userController.getAllUser);

router.get("/me", checkAuth(...Object.values(Role)), userController.getMe)
router.get("/request-host", checkAuth(Role.ADMIN, Role.SUPERADMIN), userController.getAllHostRequest)
router.patch("/become-host", checkAuth(Role.USER), userController.becomeHost)

router.get("/:userId", checkAuth(...Object.values(Role)),userController.getSingleUser)

router.patch("/approve/:userId", checkAuth(Role.ADMIN, Role.SUPERADMIN),userController.approveHost)

router.patch("/:id", checkAuth(...Object.values(Role)),
multerUpload.single("file"),
validateSchma(updateUserValidation),
userController.updateUser)

router.patch("/block/:userId", checkAuth(Role.ADMIN,Role.SUPERADMIN), userController.blockUser);

router.patch("/unblock/:userId", checkAuth(Role.ADMIN, Role.SUPERADMIN), userController.unblockUser);

export const userRouter = router