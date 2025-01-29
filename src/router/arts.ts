import { imageHandler } from '@/middlewares/imageHandler.js';
import { Router } from 'express';

import registerArt from '@/controllers/arts/registerArt.js';
import getArts from '@/controllers/arts/getArts.js';

const router = Router();

router.get('/', getArts);
router.post('/', imageHandler, registerArt);

export { router as artsRoutes };
