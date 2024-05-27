"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayLog = void 0;
const mongoose_1 = require("mongoose");
const payLogSchema = new mongoose_1.Schema({
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    payerEmail: { type: String, required: true },
    createTime: { type: String, required: true },
});
exports.PayLog = (0, mongoose_1.model)('PayLog', payLogSchema);
