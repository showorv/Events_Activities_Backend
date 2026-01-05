"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.participantsPaymentStatus = exports.participantsStatus = void 0;
var participantsStatus;
(function (participantsStatus) {
    participantsStatus["JOINED"] = "JOINED";
    participantsStatus["CANCELLED"] = "CANCELLED";
    participantsStatus["REMOVED"] = "REMOVED";
})(participantsStatus || (exports.participantsStatus = participantsStatus = {}));
var participantsPaymentStatus;
(function (participantsPaymentStatus) {
    participantsPaymentStatus["PENDING"] = "PENDING";
    participantsPaymentStatus["PAID"] = "PAID";
    participantsPaymentStatus["FAILED"] = "FAILED";
    participantsPaymentStatus["REFUNDED"] = "REFUNDED";
})(participantsPaymentStatus || (exports.participantsPaymentStatus = participantsPaymentStatus = {}));
//# sourceMappingURL=participants.interface.js.map