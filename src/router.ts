import { Router } from 'express';

import { fetchTokenData, fetchRaidData } from './controllers.js';

export const router = Router();

router.get('/token', fetchTokenData);
router.get('/raid', fetchRaidData);
