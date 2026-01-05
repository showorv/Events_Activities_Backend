"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participationRouter = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const participants_controller_1 = require("./participants.controller");
const router = (0, express_1.Router)();
router.post("/join/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), participants_controller_1.participationController.joinEvent);
router.post("/leave/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), participants_controller_1.participationController.leaveEvent);
exports.participationRouter = router;
//# sourceMappingURL=participants.router.js.map