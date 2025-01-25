import { type Request, type Response } from 'express';
import NodeCache from 'node-cache';

import { env } from '@/config/index.js';
import { tokenData } from '@/services/token/index.js';
import type { CoinMarketCapResponse } from '@/types/token.js';
import { internalServerError, sendJson } from '@/utils/http.js';

const tokenTTL = env.TOKEN_CACHE_HOURS * 3600;
const tokenCache = new NodeCache({ stdTTL: tokenTTL });

const getToken = async (_req: Request, res: Response) => {
  const cacheKey = 'tokenData';

  const cachedData = tokenCache.get<CoinMarketCapResponse>(cacheKey);

  if (cachedData) {
    console.log('Returnin token data from cache');
    return sendJson(res, cachedData);
  }

  try {
    console.log('Returning token data from service');

    const tokenJson = await tokenData();

    tokenCache.set(cacheKey, tokenJson);

    return sendJson(res, tokenJson);
  } catch (error) {
    console.error('Error on tokenData service: ', error);
    return internalServerError(res);
  }
};

export default getToken;
