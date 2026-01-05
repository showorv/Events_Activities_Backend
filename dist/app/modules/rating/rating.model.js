"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ratingSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    host: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Event", required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
}, { timestamps: true });
exports.Rating = mongoose_1.default.model("Rating", ratingSchema);
//# sourceMappingURL=rating.model.js.map