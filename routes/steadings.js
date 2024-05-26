"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SteadingProductController_1 = require("../controllers/SteadingProductController");
const router = (0, express_1.Router)();
router.post('/bycategory', SteadingProductController_1.getProductsByCategoryController);
router.get('/products/:id', SteadingProductController_1.getProductController);
router.post('/products', SteadingProductController_1.getProductsController);
exports.default = router;
