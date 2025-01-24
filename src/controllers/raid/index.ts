import NodeCache from 'node-cache';
import { type Request, type Response } from 'express';

import { raidData } from '@/services/raid/index.js';
import type { Raid } from '@/models/raid/index.js';
import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import { getEndOfDayTTL } from '@/utils/getEndOfDayTTL.js';

const raidTTL = getEndOfDayTTL();
const raidCache = new NodeCache({ stdTTL: raidTTL });

const getRaid = async (_req: Request, res: Response) => {
  const cacheKey = 'raidData';

  const cachedData = raidCache.get<Raid>(cacheKey);

  if (cachedData) {
    console.log('Returnin raid data from cache');
    return sendJson(res, cachedData);
  }

  try {
    console.log('Returning raid data from service');

    const raidJson = await raidData();

    if (raidJson === null) {
      return notFound(res);
    }

    raidCache.set(cacheKey, raidJson);

    return sendJson(res, raidJson);
  } catch (error) {
    console.error('Error on raidData service: ', error);
    return internalServerError(res);
  }
};

export default getRaid;
