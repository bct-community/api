import { type Request, type Response } from 'express';
import NodeCache from 'node-cache';

import * as s from '@/services/metrics/raid/getRaidAccessMetrics.js';
import { getEndOfDayTTL } from '@/utils/getEndOfDayTTL.js';
import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import { yesterdayFormatted } from '@/utils/yesterdayFormatted.js';
import logError from '@/utils/logError.js';

const raidAccessMetricsCacheTTL = getEndOfDayTTL();
const raidAccessMetricsCache = new NodeCache({
  stdTTL: raidAccessMetricsCacheTTL,
});

const getRaidAccessMetrics = async (_req: Request, res: Response) => {
  const cacheKey = 'raidAccessMetrics';

  const cachedData = raidAccessMetricsCache.get(cacheKey);

  if (cachedData) {
    console.log('Returning raid access metrics from cache');
    return sendJson(res, cachedData);
  }

  try {
    const metricsJson = await s.get({ date: yesterdayFormatted() });

    if (!metricsJson) {
      return notFound(res);
    }

    raidAccessMetricsCache.set(cacheKey, metricsJson);

    console.log('Returning raid access metrics from service');
    return sendJson(res, metricsJson);
  } catch (error) {
    logError({
      type: 'internal-server-error',
      controller: 'getRaidAccessMetrics',
      error,
    });

    return internalServerError(res);
  }
};

export default getRaidAccessMetrics;
