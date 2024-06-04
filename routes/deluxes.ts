import { Router } from 'express';
import { getProductsByCategoryController, getProductController, getProductsController, putProductsController } from '../controllers/ProductController';

const router = Router();

router.post('/bycategory', getProductsByCategoryController);
router.get('/products/:id', getProductController);
router.post('/products', getProductsController);
router.put('/products/:id', putProductsController);

export default router;
