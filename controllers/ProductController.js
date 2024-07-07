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
exports.getProductsByCategoryController = exports.putProductsController = exports.getProductsController = exports.getProductController = void 0;
const ProductService_1 = require("../services/ProductService");
const errors_1 = __importDefault(require("../middlewares/errors"));
const product_1 = __importDefault(require("../models/product"));
const getProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, ProductService_1.getProductService)(req.params.id);
        return res.status(201).json({
            product,
        });
    }
    catch (error) {
        (0, errors_1.default)(error, req, res);
    }
});
exports.getProductController = getProductController;
const getProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, ProductService_1.getProductsService)(req.body.page);
        return res.status(201).json({
            products,
        });
    }
    catch (error) {
        (0, errors_1.default)(error, req, res);
    }
});
exports.getProductsController = getProductsController;
const putProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productData = req.body;
        const updatedProduct = yield product_1.default.findByIdAndUpdate(id, productData, { new: true });
        if (!updatedProduct) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.status(200).send({ product: updatedProduct });
    }
    catch (error) {
        (0, errors_1.default)(error, req, res);
    }
});
exports.putProductsController = putProductsController;
const getProductsByCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, ProductService_1.getProductsByCategoryService)(req.body.filterData);
        return res.status(201).json({
            products,
        });
    }
    catch (error) {
        (0, errors_1.default)(error, req, res);
    }
});
exports.getProductsByCategoryController = getProductsByCategoryController;
