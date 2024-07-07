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
// import Product from '../models/product';
// import DeluxeProduct from '../models/deluxeProduct';
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
        //   // Check for required fields
        //   const productObj = product.toObject();
        //   // Check for required fields
        //   if (!productObj.title) {
        //     console.warn(`Skipping product with ID ${productObj._id} due to missing title.`);
        //     continue;
        //   }
        //   const deluxeProduct = new DeluxeProduct({
        //     ...productObj,
        //     length: productObj.length ? productObj.length.map(value => ({ value, price: '0' })) : [],
        //     closureLength: productObj.closureLength ? productObj.closureLength.map(value => ({ value, price: '0' })) : [],
        //     frontalLength: productObj.frontalLength ? productObj.frontalLength.map(value => ({ value, price: '0' })) : [],
        //     capSize: productObj.capSize ? productObj.capSize.map(value => ({ value, price: '0' })) : [],
        //   });
        //   await deluxeProduct.save();
        // }
        // console.log('Data migration completed successfully.');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
    finally {
        mongoose_1.default.connection.close();
    }
});
exports.default = dbConnect;
