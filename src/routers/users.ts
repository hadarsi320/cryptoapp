import { Router } from 'express';

import { addSymbolValidator } from './../controllers/users/validator';
import { addSymbol, dashboard, logout } from '../controllers/users/controller';
import validate from '../middleware/input-validation';
import enforceAuth from '../middleware/enforce_auth';

const router = Router();

router.use(enforceAuth)
router.get('/dashboard', dashboard)
router.post('/symbols/add', validate(addSymbolValidator), addSymbol)
router.get('/logout', logout)

export default router