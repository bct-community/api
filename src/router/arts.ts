import { Router } from 'express';
import multer from 'multer';

import registerArt from '@/controllers/arts/registerArt.js';
import getArts from '@/controllers/arts/getArts.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getArts);
router.post('/', upload.single('image'), registerArt);

export { router as artsRoutes };
