import { Router } from 'express';

import { linksRoutes } from './links.js';
import { metricsRoutes } from './metrics.js';
import { raidRoutes } from './raid.js';
import { tokenRoutes } from './token.js';
import { artsRoutes } from './arts.js';

export const router = Router();

router.use('/token', tokenRoutes);
router.use('/raid', raidRoutes);
router.use('/links', linksRoutes);
router.use('/metrics', metricsRoutes);
router.use('/arts', artsRoutes);
