import { type Request, type Response } from 'express';
import NodeCache from 'node-cache';

import * as s from '@/services/metrics/chat/getChatMessagesByRaid.js';
import { getEndOfDayTTL } from '@/utils/getEndOfDayTTL.js';
import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import { yesterdayFormatted } from '@/utils/yesterdayFormatted.js';

const chatMessagesByRaidCacheTTL = getEndOfDayTTL();
const chatMessagesByRaidCache = new NodeCache({
  stdTTL: chatMessagesByRaidCacheTTL,
});

const getChatMessagesByRaid = async (_req: Request, res: Response) => {
  const cacheKey = 'chatMessagesByRaid';

  const cachedData = chatMessagesByRaidCache.get(cacheKey);

  if (cachedData) {
    console.log('Returning chat messages by raid from cache');
    return sendJson(res, cachedData);
  }

  try {
    const metricsJson = await s.get({ date: yesterdayFormatted() });

    if (!metricsJson) {
      return notFound(res);
    }

    chatMessagesByRaidCache.set(cacheKey, metricsJson);

    console.log('Returning chat messages by raid from service');
    return sendJson(res, metricsJson);
  } catch (error) {
    console.error('Error on getChatMessagesByRaid service: ', error);

    return internalServerError(res);
  }
};

export default getChatMessagesByRaid;
