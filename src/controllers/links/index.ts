import { type Request, type Response } from 'express';
import NodeCache from 'node-cache';

import type { Links } from '@/models/links/index.js';
import { linksData } from '@/services/links/index.js';
import { getEndOfDayTTL } from '@/utils/getEndOfDayTTL.js';
import { internalServerError, notFound, sendJson } from '@/utils/http.js';

const linksTTL = getEndOfDayTTL();
const linksCache = new NodeCache({ stdTTL: linksTTL });

const getLinks = async (_req: Request, res: Response) => {
  const cacheKey = 'linksData';

  const cachedData = linksCache.get<Links>(cacheKey);

  if (cachedData) {
    console.log('Returnin links data from cache');
    return sendJson(res, cachedData);
  }

  try {
    console.log('Returning links data from service');

    const linksJson = await linksData();

    if (linksJson === null) {
      return notFound(res);
    }

    linksCache.set(cacheKey, linksJson);

    return sendJson(res, linksJson);
  } catch (error) {
    console.error('Error on linksData service: ', error);
    return internalServerError(res);
  }
};

export default getLinks;
