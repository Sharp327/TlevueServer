"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        default: 'jars',
    },
    description: {
        type: String,
    },
    type: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
        default: 0,
    },
    new: {
        type: Boolean,
        default: true,
    },
    sale: {
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,
        default: 10,
    },
    stock: {
        type: Number,
        default: 0,
    },
    images: (Array),
    total: {
        type: Number,
        default: 0,
    },
    rate: {
        type: Number,
        default: 0,
    },
    categorylist: (Array),
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const SteadingProduct = mongoose_1.default.models.SteadingProduct || mongoose_1.default.model('SteadingProduct', productSchema);
exports.default = SteadingProduct;
