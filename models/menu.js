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
exports.Menu = exports.Child = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Schema for nested children
const ChildSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    path: { type: String, default: '' },
    megaMenu: { type: Boolean, default: false },
    children: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Child' }], // Reference the same model for recursion
});
// Main menu schema
const MenuSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    megaMenu: { type: Boolean, default: false },
    children: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Child' }], // Reference the Child schema
});
// Create models
const Child = mongoose_1.default.model('Child', ChildSchema);
exports.Child = Child;
const Menu = mongoose_1.default.model('Menu', MenuSchema);
exports.Menu = Menu;
