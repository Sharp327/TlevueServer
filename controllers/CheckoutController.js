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
exports.CheckoutController = void 0;
const crypto_1 = __importDefault(require("crypto"));
const webhookSecret = "EJ-oQDbYyqCXK6jSoyXe_0krlh75IXzED4WmkibzoZHsxjyXY_hOt7GJYg2E3RnobpzmR4xOeHbN-Qtu";
const errors_1 = __importDefault(require("../middlewares/errors"));
const CheckoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('webhook');
        // Ensure that the request is a POST request
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
        // Get the raw body and the signature from headers
        const rawBody = JSON.stringify(req.body);
        const signature = req.headers['paypal-transmission-id'];
        // Verify the signature using HMAC with the secret
        const verified = crypto_1.default
            .createHmac('sha256', webhookSecret || '')
            .update(rawBody)
            .digest('hex');
        // Check if the computed signature matches the header's signature
        if (signature === verified) {
            console.log('Webhook received:', req.body);
            // Your course fulfillment or other business logic here
            res.status(200).json({ message: 'Webhook received successfully.' });
        }
        else {
            console.error('Webhook verification failed.');
            res.status(403).json({ message: 'Unauthorized' });
        }
    }
    catch (error) {
        (0, errors_1.default)(error, req, res);
    }
});
exports.CheckoutController = CheckoutController;
