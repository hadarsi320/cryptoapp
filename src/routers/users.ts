import Router from 'express';
import { addSymbol, dashboard } from '../controllers/users/controller';

const router = Router();

router.get('/dashboard', dashboard)
router.get('/symbol', addSymbol)
// router.get('/logout', logout)

export default router