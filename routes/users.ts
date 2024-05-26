import { Router } from 'express';
import { signInUserController } from '../controllers/UserController';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    await signInUserController(req, res);
    res.status(200).json({ success: true });
  } catch (error: any) {
    if (error.type === 'CredentialsSignin') {
      res.status(401).json({ error: 'Invalid credentials.' });
    } else {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
});

export default router;
