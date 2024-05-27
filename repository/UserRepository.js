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
exports.signInUserRepository = exports.registerUserRepository = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ValidationError_1 = __importDefault(require("../utils/errors/ValidationError"));
const registerUserRepository = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = user;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = new user_1.default({ firstName, lastName, email, password: hashedPassword });
    yield newUser.save();
    return newUser;
});
exports.registerUserRepository = registerUserRepository;
const signInUserRepository = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = user;
    const loginUser = yield user_1.default.findOne({ email });
    if (!loginUser) {
        throw new ValidationError_1.default("Invalid email or password", 400);
    }
    const validPassword = yield bcryptjs_1.default.compare(password, loginUser.password);
    if (!validPassword) {
        throw new ValidationError_1.default("Invalid email or password", 400);
    }
    loginUser.password = "";
    return loginUser;
});
exports.signInUserRepository = signInUserRepository;
