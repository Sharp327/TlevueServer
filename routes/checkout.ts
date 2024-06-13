import { Router } from 'express';
import { CheckoutController, AddOrderItemController, StripeController, StripeHookController } from '../controllers/CheckoutController';

const router = Router();

router.post('/paypal-webhook', CheckoutController);
router.post('/addOrderItems', AddOrderItemController);
router.post('/stripe', StripeController);
router.post('/stripe-hook', StripeHookController);

export default router;