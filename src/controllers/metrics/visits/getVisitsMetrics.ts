import { type Request, type Response } from 'express';
import NodeCache from 'node-cache';

import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import * as s from '@/services/metrics/visits/getVisitsMetrics.js';
import { yesterdayFormatted } from '@/utils/yesterdayFormatted.js';
import { getEndOfDayTTL } from '@/utils/getEndOfDayTTL.js';

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
    console.error('Error on getVisitsMetrics service: ', error);

    return internalServerError(res);
  }
};

export default getVisitsMetrics;
