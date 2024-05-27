import { Router } from 'express';
import { registerUserController, signInUserController } from '../controllers/UserController';

const router = Router();

router.post('/signup', registerUserController);
router.post('/login', signInUserController);

export default router;
