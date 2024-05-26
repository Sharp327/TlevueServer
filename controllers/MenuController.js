"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuController = void 0;
const errors_1 = __importDefault(require("../middlewares/errors"));
const MenuService_1 = require("../services/MenuService");
const getMenuController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Data seeded successfully!1');
        const menus = yield (0, MenuService_1.getMenuService)();
        return res.status(201).json({
            menus,
        });
    }
    catch (error) {
        (0, errors_1.default)(error, req, res);
    }
});
exports.getMenuController = getMenuController;
