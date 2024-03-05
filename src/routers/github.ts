import Router from 'express';

const router = Router();

const authenticate = () => {}
const callback = () => {}

router.get('/authenticate', authenticate)
router.get('/callback', callback)

export default router