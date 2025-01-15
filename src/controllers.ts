import NodeCache from 'node-cache';
import { type Request, type Response } from 'express';

import { tokenData } from './coinMarketCap.js';
import type { CoinMarketCapResponse } from './schemas.js';
import { internalServerError, notFound, sendJson } from './http.js';
import { env } from './config.js';
import { raidData } from './mongoDb.js';
import type { Raid } from './models.js';

const tokenTTL = env.TOKEN_CACHE_HOURS * 3600;
const tokenCache = new NodeCache({ stdTTL: tokenTTL });

export const fetchTokenData = async (_req: Request, res: Response) => {
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

function calculateRaidTTL() {
  const now = new Date();
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  const ttlInSeconds = Math.floor((endOfDay.getTime() - now.getTime()) / 1000);
  return ttlInSeconds;
}

const raidTTL = calculateRaidTTL();
const raidCache = new NodeCache({ stdTTL: raidTTL });

export const fetchRaidData = async (_req: Request, res: Response) => {
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
