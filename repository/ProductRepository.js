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
exports.insertProduct = exports.getProductsByCategoryRepository = exports.getProductsRepository = exports.getProductRepository = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProductRepository = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.findById(id);
    return product;
});
exports.getProductRepository = getProductRepository;
const getProductsRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find();
    return products;
});
exports.getProductsRepository = getProductsRepository;
const getProductsByCategoryRepository = (filterData) => __awaiter(void 0, void 0, void 0, function* () {
    // insertProduct();
    // Define the split arrays for additional filtering
    const laceTextureList = filterData.laceTexture ? filterData.laceTexture.split(',') : [];
    const laceSizeList = filterData.laceSize ? filterData.laceSize.split(',') : [];
    const hairTextureList = filterData.hairTexture ? filterData.hairTexture.split(',') : [];
    const densityList = filterData.density ? filterData.density.split(',') : [];
    const hairLengthList = filterData.hairLength ? filterData.hairLength.split(',') : [];
    const hairColorList = filterData.hairColor ? filterData.hairColor.split(',') : [];
    const categoryList = filterData.category ? filterData.category.split(',') : [];
    const conditions = [];
    // Add conditions to the array only if they have elements to check against
    if (laceTextureList.length > 0) {
        conditions.push({ texture: { $in: laceTextureList } });
    }
    if (laceSizeList.length > 0) {
        conditions.push({ laceSize: { $in: laceSizeList } });
    }
    if (hairTextureList.length > 0) {
        conditions.push({ laceType: { $in: hairTextureList } });
    }
    if (densityList.length > 0) {
        conditions.push({ destiny: { $in: densityList } });
    }
    if (hairLengthList.length > 0) {
        conditions.push({ length: { $in: hairLengthList } });
    }
    if (hairColorList.length > 0) {
        conditions.push({ color: { $in: hairColorList } });
    }
    const query = {};
    if (categoryList.length > 0) {
        conditions.push({ categorylist: {
                $in: categoryList, // Primary condition
            } });
        // query.categorylist = {
        //   $in: categoryList, // Primary condition
        // };
    }
    if (conditions.length > 0) {
        query.$or = conditions; // Add the $or condition only if there are conditions to apply
    }
    console.log(query);
    // Query the products with the appropriate conditions
    const products = yield product_1.default.find(query);
    return products;
});
exports.getProductsByCategoryRepository = getProductsByCategoryRepository;
function saveProductData(productData) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const item of productData) {
            const newproduct = new product_1.default(Object.assign({}, item));
            try {
                yield newproduct.save();
                console.log(`Saved: ${item.title}`);
            }
            catch (error) {
                console.error(`Error saving ${item.title}: `, error);
            }
        }
    });
}
const insertProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create a new product instance with the desired data
        // const insertProductlist = [];
        // await saveProductData(insertProductlist);
        console.log('Product inserted successfully');
    }
    catch (error) {
        console.error('Error inserting product:', error);
    }
});
exports.insertProduct = insertProduct;
