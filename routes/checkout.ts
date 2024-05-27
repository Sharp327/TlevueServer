import { Router } from 'express';
import { CheckoutController } from '../controllers/CheckoutController';

const router = Router();

router.post('/paypal-webhook', CheckoutController);

export default router;