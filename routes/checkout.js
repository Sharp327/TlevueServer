"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CheckoutController_1 = require("../controllers/CheckoutController");
const router = (0, express_1.Router)();
router.post('/paypal-webhook', CheckoutController_1.CheckoutController);
router.post('/addOrderItems', CheckoutController_1.AddOrderItemController);
router.post('/stripe', CheckoutController_1.StripeController);
router.post('/stripe-hook', CheckoutController_1.StripeHookController);
exports.default = router;
