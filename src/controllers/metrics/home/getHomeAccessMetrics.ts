import { type Request, type Response } from 'express';
import NodeCache from 'node-cache';

import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import * as s from '@/services/metrics/home/getHomeAccessMetrics.js';
import { yesterdayFormatted } from '@/utils/yesterdayFormatted.js';
import { getEndOfDayTTL } from '@/utils/getEndOfDayTTL.js';

const homeAccessMetricsCacheTTL = getEndOfDayTTL();
const homeAccessMetricsCache = new NodeCache({
  stdTTL: homeAccessMetricsCacheTTL,
});

const getHomeAccessMetrics = async (_req: Request, res: Response) => {
  const cacheKey = 'homeAccessMetrics';

  const cachedData = homeAccessMetricsCache.get(cacheKey);

  if (cachedData) {
    console.log('Returning home access metrics from cache');
    return sendJson(res, cachedData);
  }

  try {
    const metricsJson = await s.get({ date: yesterdayFormatted() });

    if (!metricsJson) {
      return notFound(res);
    }

    homeAccessMetricsCache.set(cacheKey, metricsJson);

    console.log('Returning home access metrics from service');
    return sendJson(res, metricsJson);
  } catch (error) {
    console.error('Error on getHomeAccessMetrics service: ', error);

    return internalServerError(res);
  }
};

export default getHomeAccessMetrics;
