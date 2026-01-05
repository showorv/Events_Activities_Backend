"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const env_1 = require("../../config/env");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createUser = async (payload) => {
    const { email, password, ...rest } = payload;
    if (!email) {
        throw new Error("Email is required");
    }
    const userExist = await user_model_1.User.findOne({ email });
    if (userExist) {
        throw new AppError_1.default(401, "email already exist");
    }
    const hashPassword = await bcryptjs_1.default.hash(password, Number(env_1.envVars.HASH_SALT));
    const user = await user_model_1.User.create({
        email,
        password: hashPassword,
        ...rest
    });
    return user;
};
const getAllUser = async (query) => {
    const { page = 1, limit = 10, search = "", role } = query;
    const filter = {};
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
        ];
    }
    if (role)
        filter.role = role;
    const skip = (Number(page) - 1) * Number(limit);
    const [users, total] = await Promise.all([
        user_model_1.User.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
        user_model_1.User.countDocuments(filter),
    ]);
    return {
        data: users,
        meta: {
            total,
            page: Number(page),
            limit: Number(limit),
        },
    };
};
const blockUser = async (userId) => {
    const user = await user_model_1.User.findById(userId);
    if (!user)
        throw new AppError_1.default(404, "User not found");
    user.isBlocked = true;
    await user.save();
    return user;
};
const unBlockUser = async (userId) => {
    const user = await user_model_1.User.findById(userId);
    if (!user)
        throw new AppError_1.default(404, "User not found");
    user.isBlocked = false;
    await user.save();
    return user;
};
const getSingleUser = async (userId) => {
    const user = await user_model_1.User.findById(userId).select("-password");
    return user;
};
const updateUser = async (userId, payload, decodeToken) => {
    if (decodeToken.role === user_interface_1.Role.USER || decodeToken.role === user_interface_1.Role.HOST) {
        if (userId !== decodeToken.userId) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "you cannot update this");
        }
    }
    const findUser = await user_model_1.User.findById(userId);
    if (!findUser) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user not found");
    }
    if (decodeToken.role === user_interface_1.Role.ADMIN && findUser.role === user_interface_1.Role.SUPERADMIN) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "you are not authorized");
    }
    if (payload.role) {
        if (decodeToken.role === user_interface_1.Role.USER || decodeToken.role === user_interface_1.Role.HOST) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "you are not authorized");
        }
        // if(payload.role === Role.SUPERADMIN || decodeToken.role === Role.ADMIN){
        //     throw new AppError(httpStatus.FORBIDDEN, "you are not authorized")
        // }
    }
    if (payload.isBlocked) {
        if (decodeToken.role === user_interface_1.Role.USER || decodeToken.role === user_interface_1.Role.HOST) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "you are not authorized");
        }
    }
    const newUpdateUser = await user_model_1.User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    if (payload.profileImage && findUser.profileImage) {
        await (0, cloudinary_config_1.cloudinaryDeleteUpload)(findUser.profileImage);
    }
    return newUpdateUser;
};
const getMe = async (userId) => {
    const user = await user_model_1.User.findById(userId).select("-password");
    if (!user)
        return null;
    return user;
};
const becomeHost = async (userId) => {
    const user = await user_model_1.User.findById(userId);
    if (user?.role !== user_interface_1.Role.USER) {
        throw new AppError_1.default(401, "you cannot become host");
    }
    const updateUser = await user_model_1.User.findByIdAndUpdate(userId, { isHostRequest: true }, { new: true });
    return updateUser;
};
const approveHost = async (userId) => {
    const user = await user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(401, "user not found");
    }
    const updateUser = await user_model_1.User.findByIdAndUpdate(userId, { isHostRequest: false, role: user_interface_1.Role.HOST, isHostApproved: true }, { new: true });
    return updateUser;
};
const getAllHostRequest = async () => {
    const hostRequest = await user_model_1.User.find({ isHostRequest: true, isHostApproved: false, role: user_interface_1.Role.USER });
    return hostRequest;
};
exports.userService = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    getMe,
    blockUser,
    unBlockUser,
    becomeHost,
    approveHost,
    getAllHostRequest
};
//# sourceMappingURL=user.service.js.map