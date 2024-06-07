import { Router } from 'express';
import { CheckoutController, AddOrderItemController, StripeController } from '../controllers/CheckoutController';

const router = Router();

router.post('/paypal-webhook', CheckoutController);
router.post('/addOrderItems', AddOrderItemController);
router.post('/stripe', StripeController);

export default router;