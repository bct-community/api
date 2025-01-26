import { type Request, type Response } from 'express';
import NodeCache from 'node-cache';

import * as s from '@/services/metrics/visits/getVisitsMetrics.js';
import { getEndOfDayTTL } from '@/utils/getEndOfDayTTL.js';
import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import { yesterdayFormatted } from '@/utils/yesterdayFormatted.js';
import logError from '@/utils/logError.js';

const visitMetricsCacheTTL = getEndOfDayTTL();
const visitMetricsCache = new NodeCache({
  stdTTL: visitMetricsCacheTTL,
});

const getVisitsMetrics = async (_req: Request, res: Response) => {
  const cacheKey = 'visitMetrics';

  const cachedData = visitMetricsCache.get(cacheKey);

  if (cachedData) {
    console.log('Returning visit access metrics from cache');
    return sendJson(res, cachedData);
  }

  try {
    const metricsJson = await s.get({ date: yesterdayFormatted() });

    if (!metricsJson) {
      return notFound(res);
    }

    visitMetricsCache.set(cacheKey, metricsJson);

    console.log('Returning visit access metrics from service');
    return sendJson(res, metricsJson);
  } catch (error) {
    logError({
      type: 'internal-server-error',
      controller: 'getVisitsMetrics',
      error,
    });

    return internalServerError(res);
  }
};

export default getVisitsMetrics;
