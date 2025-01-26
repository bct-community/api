import { Router } from 'express';
import multer from 'multer';

import registerArt from '@/controllers/arts/registerArt.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), registerArt);

export { router as artsRoutes };
