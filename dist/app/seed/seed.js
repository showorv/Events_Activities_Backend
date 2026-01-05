"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdmin = void 0;
const env_1 = require("../config/env");
const user_interface_1 = require("../modules/user/user.interface");
const user_model_1 = require("../modules/user/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const superAdmin = async () => {
    try {
        const superAdminExist = await user_model_1.User.findOne({ email: env_1.envVars.SUPER_ADMIN_EMAIL });
        if (superAdminExist) {
            console.log("super admin already exist");
            return;
        }
        if (!superAdminExist) {
            console.log("super admin creating");
        }
        const hashedPassword = await bcryptjs_1.default.hash(env_1.envVars.SUPER_ADMIN_PASSWORD, Number(env_1.envVars.HASH_SALT));
        // const authProvider : IAuths = {
        //     provider: "credential",
        //     providerId: envVars.SUPER_ADMIN_EMAIL as string
        // }
        const payload = {
            name: "Super admin",
            email: env_1.envVars.SUPER_ADMIN_EMAIL,
            password: hashedPassword,
            role: user_interface_1.Role.SUPERADMIN,
            // auths: [authProvider],
            isVerified: true,
            isBlocked: false
        };
        const superAdmin = await user_model_1.User.create(payload);
        console.log("super admin created");
        console.log(superAdmin);
    }
    catch (error) {
        console.log(error);
    }
};
exports.superAdmin = superAdmin;
//# sourceMappingURL=seed.js.map