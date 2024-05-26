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
exports.signInUserService = exports.registerUserService = void 0;
const UserRepository_1 = require("../repository/UserRepository");
const ValidationError_1 = __importDefault(require("../utils/errors/ValidationError"));
const registerUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.name || !user.email || !user.password)
        throw new ValidationError_1.default("Can't be empty", 400);
    const newUser = yield (0, UserRepository_1.registerUserRepository)(user);
    return newUser;
});
exports.registerUserService = registerUserService;
const signInUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.name || !user.email || !user.password)
        throw new ValidationError_1.default("Can't be empty", 400);
    const newUser = yield (0, UserRepository_1.signInUserRepository)(user);
    return newUser;
});
exports.signInUserService = signInUserService;
