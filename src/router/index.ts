import { Router } from 'express';

import { tokenRoutes } from './token.js';
import { raidRoutes } from './raid.js';
import { linksRoutes } from './links.js';
import { metricsRoutes } from './metrics.js';

export const router = Router();

router.use('/token', tokenRoutes);
router.use('/raid', raidRoutes);
router.use('/links', linksRoutes);
router.use('/metrics', metricsRoutes);
