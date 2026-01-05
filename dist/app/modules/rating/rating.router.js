"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateRouter = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const rating_controller_1 = require("./rating.controller");
const router = (0, express_1.Router)();
router.post("/rate", (0, checkAuth_1.checkAuth)(user_interface_1.Role.USER), rating_controller_1.rateController.rateHost);
router.get("/getRating", (0, checkAuth_1.checkAuth)(user_interface_1.Role.HOST), rating_controller_1.rateController.getHostRatings);
router.get("/:hostId", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), rating_controller_1.rateController.getHostAverageRating);
exports.rateRouter = router;
//# sourceMappingURL=rating.router.js.map