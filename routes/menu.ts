import { Router } from 'express';
import { getMenuController } from '../controllers/MenuController';

const router = Router();

router.post('/getmenu', getMenuController);

export default router;