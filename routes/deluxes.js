"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const router = (0, express_1.Router)();
router.post('/bycategory', ProductController_1.getProductsByCategoryController);
router.get('/products/:id', ProductController_1.getProductController);
router.post('/products', ProductController_1.getProductsController);
exports.default = router;
