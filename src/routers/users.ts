import { addSymbolValidator } from './../controllers/users/validator';
import { Router } from 'express';
import { addSymbol, dashboard } from '../controllers/users/controller';
import validate from '../middleware/input-validation';

const router = Router();

router.get('/dashboard', dashboard)
router.post('/symbols/add', validate(addSymbolValidator), addSymbol)
// router.get('/logout', logout)

export default router