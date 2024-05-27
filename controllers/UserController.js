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
exports.signInUserController = exports.registerUserController = void 0;
const UserService_1 = require("../services/UserService");
const errors_1 = __importDefault(require("../middlewares/errors"));
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, UserService_1.registerUserService)(req.body);
        return res.status(201).json({
            user,
        });
    }
    catch (error) {
        (0, errors_1.default)(error, req, res);
    }
});
exports.registerUserController = registerUserController;
const signInUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, UserService_1.signInUserService)(req.body);
        return res.status(201).json({
            user,
        });
    }
    catch (error) {
        (0, errors_1.default)(error, req, res);
    }
});
exports.signInUserController = signInUserController;
