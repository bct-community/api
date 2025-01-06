import { Router } from 'express';

import { fetchTokenData } from './controllers.js';

export const router = Router();

router.get('/token', fetchTokenData);
