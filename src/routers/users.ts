import Router from 'express';
import { dashboard } from '../controllers/users/controller';

const router = Router();

router.get('/dashboard', dashboard)
// router.get('/logout', logout)
// router.get('/symbol', add_symbol)

export default router