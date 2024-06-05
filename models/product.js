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
        required: [true, 'Please enter your title'],
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
        type: String,
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
    qty: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        default: 0,
    },
    rate: {
        type: Number,
        default: 0,
    },
    laceType: (Array),
    selectedLaceType: {
        type: String,
    },
    laceSize: (Array),
    destiny: (Array),
    selectedDestiny: {
        type: String,
    },
    length: (Array),
    selectedLength: {
        type: String,
    },
    color: {
        type: String,
        default: 'Natural Color',
    },
    availableTextures: (Array),
    texture: {
        type: String,
        default: 'HD Lace',
    },
    closureLength: (Array),
    selectedClosureLength: {
        type: String,
        default: '14',
    },
    frontalLength: (Array),
    selectedFrontalLength: {
        type: String,
        default: '14',
    },
    capSize: (Array),
    selectedCapSize: {
        type: String,
        default: '14',
    },
    hairType: {
        type: String,
        default: '100% Virgin Human Hair',
    },
    categorylist: (Array),
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Product = mongoose_1.default.models.Product || mongoose_1.default.model('Product', productSchema);
exports.default = Product;
