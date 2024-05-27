import { Router } from 'express';
import { getMenuController } from '../controllers/MenuController';

const router = Router();

router.get('/getMenu', getMenuController);

export default router;