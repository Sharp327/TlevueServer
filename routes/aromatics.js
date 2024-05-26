"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AromaticProductController_1 = require("../controllers/AromaticProductController");
const router = (0, express_1.Router)();
router.post('/bycategory', AromaticProductController_1.getProductsByCategoryController);
router.get('/products/:id', AromaticProductController_1.getProductController);
router.post('/products', AromaticProductController_1.getProductsController);
exports.default = router;
