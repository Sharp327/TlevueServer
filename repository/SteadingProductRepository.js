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
const steadingProduct_1 = __importDefault(require("../models/steadingProduct"));
const getProductRepository = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield steadingProduct_1.default.findById(id);
    return product;
});
exports.getProductRepository = getProductRepository;
const getProductsRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield steadingProduct_1.default.find();
    return products;
});
exports.getProductsRepository = getProductsRepository;
const getProductsByCategoryRepository = (filterData) => __awaiter(void 0, void 0, void 0, function* () {
    // insertProduct();
    const pricemin = filterData.pricemin ? filterData.pricemin : 0;
    const pricemax = filterData.pricemax ? filterData.pricemax : 0;
    const categoryList = filterData.category ? filterData.category.split(',') : [];
    const conditions = [];
    if (pricemin !== 0 && pricemax !== 0)
        conditions.push({ price: { $gte: pricemin, $lte: pricemax } });
    if (pricemin !== 0 && pricemax == 0)
        conditions.push({ price: { $gte: pricemin } });
    if (pricemin == 0 && pricemax !== 0)
        conditions.push({ price: { $lte: pricemax } });
    const query = {
        categorylist: {
            $in: categoryList, // Primary condition
        },
    };
    if (conditions.length > 0) {
        query.$or = conditions; // Add the $or condition only if there are conditions to apply
    }
    // Query the products with the appropriate conditions
    const products = yield steadingProduct_1.default.find(query);
    return products;
});
exports.getProductsByCategoryRepository = getProductsByCategoryRepository;
const insertProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new steadingProduct_1.default({
            title: 'Goat1',
            description: 'Goat description',
            type: 'steading',
            price: 100,
            new: true,
            sale: true,
            discount: 10,
            stock: 10,
            images: [
                { image_id: 1, id: 1, alt: 'Image 1', src: '/images/layout-4/product/goat.jpg' },
                { image_id: 2, id: 2, alt: 'Image 2', src: '/images/layout-4/product/goat.jpg' },
                { image_id: 3, id: 3, alt: 'Image 3', src: '/images/layout-4/product/goat.jpg' },
                { image_id: 4, id: 4, alt: 'Image 4', src: '/images/layout-4/product/goat.jpg' },
            ],
            total: 2512,
            rate: 3.5,
            categorylist: [
                'Female Goat',
            ],
            createdAt: new Date(),
        });
        // Save the product to the database
        yield newProduct.save();
        console.log('Product inserted successfully');
    }
    catch (error) {
        console.error('Error inserting product:', error);
    }
});
exports.insertProduct = insertProduct;
