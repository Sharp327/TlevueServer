import { Router } from 'express';
import { getProductsByCategoryController, getProductController, getProductsController } from '../controllers/SteadingProductController';

const router = Router();

router.post('/bycategory', getProductsByCategoryController);
router.get('/products/:id', getProductController);
router.post('/products', getProductsController);

export default router;