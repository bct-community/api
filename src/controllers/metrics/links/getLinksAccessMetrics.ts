import { type Request, type Response } from 'express';
import NodeCache from 'node-cache';

import * as s from '@/services/metrics/links/getLinksAccessMetrics.js';
import { getEndOfDayTTL } from '@/utils/getEndOfDayTTL.js';
import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import { yesterdayFormatted } from '@/utils/yesterdayFormatted.js';
import logError from '@/utils/logError.js';

const linksAccessMetricsCacheTTL = getEndOfDayTTL();
const linksAccessMetricsCache = new NodeCache({
  stdTTL: linksAccessMetricsCacheTTL,
});

const getLinksAccessMetrics = async (_req: Request, res: Response) => {
  const cacheKey = 'linksAccessMetrics';

  const cachedData = linksAccessMetricsCache.get(cacheKey);

  if (cachedData) {
    console.log('Returning links access metrics from cache');
    return sendJson(res, cachedData);
  }

  try {
    const metricsJson = await s.get({ date: yesterdayFormatted() });

    if (!metricsJson) {
      logError({
        type: 'not-found',
        controller: 'getLinksAccessMetrics',
        error: 'Link access metrics found',
      });

      return notFound(res);
    }

    linksAccessMetricsCache.set(cacheKey, metricsJson);

    console.log('Returning links access metrics from service');
    return sendJson(res, metricsJson);
  } catch (error) {
    logError({
      type: 'internal-server-error',
      controller: 'getLinksAccessMetrics',
      error,
    });

    return internalServerError(res);
  }
};

export default getLinksAccessMetrics;
