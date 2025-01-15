import NodeCache from 'node-cache';
import { type Request, type Response } from 'express';

import { tokenData } from './coinMarketCap.js';
import type { CoinMarketCapResponse } from './schemas.js';
import { internalServerError, sendJson } from './http.js';
import { env } from './config.js';

const tokenTTL = env.TOKEN_CACHE_HOURS * 3600;
const tokenCache = new NodeCache({ stdTTL: tokenTTL });

export const fetchTokenData = async (_req: Request, res: Response) => {
  const cacheKey = 'tokenData';

  const cachedData = tokenCache.get<CoinMarketCapResponse>(cacheKey);

  if (cachedData) {
    console.log('Returnin data from cache');
    return sendJson(res, cachedData);
  }

  try {
    console.log('Returning data from service');

    const tokenJson = await tokenData();

    tokenCache.set(cacheKey, tokenJson);

    return sendJson(res, tokenJson);
  } catch (error) {
    console.error('Error on tokenData service: ', error);
    return internalServerError(res);
  }
};
