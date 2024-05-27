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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByCategoryService = exports.getProductsService = exports.getProductService = void 0;
const ProductRepository_1 = require("../repository/ProductRepository");
const getProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield (0, ProductRepository_1.getProductRepository)(id);
    return newProduct;
});
exports.getProductService = getProductService;
const getProductsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const newProducts = yield (0, ProductRepository_1.getProductsRepository)();
    return newProducts;
});
exports.getProductsService = getProductsService;
const getProductsByCategoryService = (filterData) => __awaiter(void 0, void 0, void 0, function* () {
    const newProducts = yield (0, ProductRepository_1.getProductsByCategoryRepository)(filterData);
    return newProducts;
});
exports.getProductsByCategoryService = getProductsByCategoryService;
