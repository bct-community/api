import { Router } from 'express';
import multer from 'multer';

import register from '@/controllers/arts/register.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), register);

export { router as artsRoutes };
