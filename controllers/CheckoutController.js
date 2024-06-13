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
exports.StripeHookController = exports.StripeController = exports.getOrderItemController = exports.AddOrderItemController = exports.CheckoutController = void 0;
const crypto_1 = __importDefault(require("crypto"));
const webhookSecret = "EB3HOX498EOhuSqV3Ev_YFCmAcyp8z43zmS57Lm2p4GOpxwRLU41KI_Jf5b_d2nHQTu3KEAQJjXsWMRm";
const errors_1 = __importDefault(require("../middlewares/errors"));
const payLog_1 = require("../models/payLog");
const order_1 = __importDefault(require("../models/order"));
const stripe_1 = __importDefault(require("stripe"));
const secretKey = "sk_test_51JrgTaHz47FoVxKIhnTmCeehkEDRlmGiX40lvjCBERiy48AjLcRRlb1nD0ion5luM6J5Z06EeMnGBJ4Q60ZYvGWg001mQYv1aQ";
const stripe = new stripe_1.default(secretKey);
const host = process.env.PUBLIC_HOST || "https://tlevue.com";
const endpointSecret = "whsec_6211c5da3208c3663bbdadb1b3e80307d433107a9ba9937d1d450015dbc7aa16";
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
            const { order } = req.body;
            const payLog = new payLog_1.PayLog({
                orderId: order.id,
                amount: order.purchase_units[0].amount.value,
                status: order.status,
                payerEmail: order.payer.email_address,
                createTime: order.create_time,
            });
            yield payLog.save();
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
const AddOrderItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartItems, userid } = req.body;
        yield saveOrdersData(Object.assign(Object.assign({}, cartItems), { userid }));
        // const user = await registerUserService(req.body as Product)
        return res.status(201).json({
        // user,
        });
    }
    catch (error) {
        (0, errors_1.default)(error, req, res);
    }
});
exports.AddOrderItemController = AddOrderItemController;
const getOrderItemController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartItems } = req.body;
        yield saveOrdersData(cartItems);
        // const user = await registerUserService(req.body as Product)
        return res.status(201).json({
        // user,
        });
    }
    catch (error) {
        (0, errors_1.default)(error, req, res);
    }
});
exports.getOrderItemController = getOrderItemController;
function saveOrdersData(cartItems) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const item of cartItems) {
            const newOrder = new order_1.default(item);
            try {
                yield newOrder.save();
                console.log(`Saved: ${item.title}`);
            }
            catch (error) {
                console.error(`Error saving ${item.title}: `, error);
            }
        }
    });
}
const StripeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        const date = new Date().toISOString();
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "INV-" + date,
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            cancel_url: `${host}`,
            success_url: `${host}/pages/order-success`,
        });
        return res.status(200).json({ sessionId: session.id });
    }
    catch (error) {
        (0, errors_1.default)(error, req, res);
    }
});
exports.StripeController = StripeController;
const StripeHookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await saveOrdersData(cartItems);
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig || [], endpointSecret);
        }
        catch (err) {
            res.status(400).send(`Webhook Error: ${err}`);
            return;
        }
        console.log(event);
        // Handle the event
        switch (event.type) {
            case 'checkout.session.async_payment_failed':
                const checkoutSessionAsyncPaymentFailed = event.data.object;
                // Then define and call a function to handle the event checkout.session.async_payment_failed
                break;
            case 'checkout.session.async_payment_succeeded':
                const checkoutSessionAsyncPaymentSucceeded = event.data.object;
                // Then define and call a function to handle the event checkout.session.async_payment_succeeded
                break;
            case 'checkout.session.completed':
                const checkoutSessionCompleted = event.data.object;
                // Then define and call a function to handle the event checkout.session.completed
                break;
            case 'checkout.session.expired':
                const checkoutSessionExpired = event.data.object;
                // Then define and call a function to handle the event checkout.session.expired
                break;
            case 'payment_method.attached':
                const paymentMethodAttached = event.data.object;
                // Then define and call a function to handle the event payment_method.attached
                break;
            case 'payment_method.automatically_updated':
                const paymentMethodAutomaticallyUpdated = event.data.object;
                // Then define and call a function to handle the event payment_method.automatically_updated
                break;
            case 'payment_method.detached':
                const paymentMethodDetached = event.data.object;
                // Then define and call a function to handle the event payment_method.detached
                break;
            case 'payment_method.updated':
                const paymentMethodUpdated = event.data.object;
                // Then define and call a function to handle the event payment_method.updated
                break;
            case 'product.created':
                const productCreated = event.data.object;
                // Then define and call a function to handle the event product.created
                break;
            case 'product.deleted':
                const productDeleted = event.data.object;
                // Then define and call a function to handle the event product.deleted
                break;
            case 'product.updated':
                const productUpdated = event.data.object;
                // Then define and call a function to handle the event product.updated
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        res.send();
    }
    catch (error) {
        (0, errors_1.default)(error, req, res);
    }
});
exports.StripeHookController = StripeHookController;
