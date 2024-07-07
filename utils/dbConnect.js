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
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
        throw new Error('MONGODB_URI environment variable is not defined');
    }
    try {
        yield mongoose_1.default.connect(mongodbUri);
        console.log('Connected to MongoDB');
        // const products = await Product.find({});
        // for (const product of products) {
        //   const deluxeProduct = new DeluxeProduct({
        //     ...product,
        //     length: product['length']?product['length'].map(value => ({ value, price: '0' })):[],
        //     closureLength: product['closureLength']?product['closureLength'].map(value => ({ value, price: '0' })):[],
        //     frontalLength: product['frontalLength']?product['frontalLength'].map(value => ({ value, price: '0' })):[],
        //     capSize: product['capSize']?product['capSize'].map(value => ({ value, price: '0' })):[],
        //   })
        //   await deluxeProduct.save();
        // }
        console.log('Data migration completed successfully.');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
});
exports.default = dbConnect;
