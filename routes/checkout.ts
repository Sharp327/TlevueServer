import { Router } from 'express';
import { CheckoutController, AddOrderItemController } from '../controllers/CheckoutController';

const router = Router();

router.post('/paypal-webhook', CheckoutController);
router.post('/addOrderItems', AddOrderItemController);

export default router;