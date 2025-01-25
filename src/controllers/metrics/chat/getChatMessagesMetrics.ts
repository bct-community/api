import { type Request, type Response } from 'express';
import NodeCache from 'node-cache';

import * as s from '@/services/metrics/chat/getChatMessagesMetrics.js';
import { getEndOfDayTTL } from '@/utils/getEndOfDayTTL.js';
import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import { yesterdayFormatted } from '@/utils/yesterdayFormatted.js';

const chatMessagesMetricsCacheTTL = getEndOfDayTTL();
const chatMessagesMetricsCache = new NodeCache({
  stdTTL: chatMessagesMetricsCacheTTL,
});

const getChatMessagesMetrics = async (_req: Request, res: Response) => {
  const cacheKey = 'chatMessagesMetrics';

  const cachedData = chatMessagesMetricsCache.get(cacheKey);

  if (cachedData) {
    console.log('Returning chat messages metrics from cache');
    return sendJson(res, cachedData);
  }

  try {
    const metricsJson = await s.get({ date: yesterdayFormatted() });

    if (!metricsJson) {
      return notFound(res);
    }

    chatMessagesMetricsCache.set(cacheKey, metricsJson);

    console.log('Returning chat messages metrics from service');
    return sendJson(res, metricsJson);
  } catch (error) {
    console.error('Error on getChatMessagesMetrics service: ', error);

    return internalServerError(res);
  }
};

export default getChatMessagesMetrics;
