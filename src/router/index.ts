import { Router } from 'express';

import { tokenRoutes } from './token.js';
import { raidRoutes } from './raid.js';
import { metricsRoutes } from './metrics.js';

export const router = Router();

router.use('/token', tokenRoutes);
router.use('/raid', raidRoutes);
router.use('/metrics', metricsRoutes);
