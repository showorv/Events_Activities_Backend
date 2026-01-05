"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitContact = void 0;
const contact_model_1 = require("./contact.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const submitContact = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        throw new AppError_1.default(400, "All fields are required");
    }
    const contact = await contact_model_1.Contact.create({ name, email, message });
    res.status(201).json({
        success: true,
        message: "Your inquiry has been submitted successfully",
        data: contact,
    });
};
exports.submitContact = submitContact;
//# sourceMappingURL=contact.controller.js.map