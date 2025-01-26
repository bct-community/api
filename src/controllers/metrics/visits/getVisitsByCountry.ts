import { type Request, type Response } from 'express';

import * as s from '@/services/metrics/visits/getVisitsByCountry.js';
import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import logError from '@/utils/logError.js';

const getVisitsByCountry = async (_req: Request, res: Response) => {
  try {
    const metricsJson = await s.get();

    if (!metricsJson) {
      return notFound(res);
    }

    return sendJson(res, metricsJson);
  } catch (error) {
    logError({
      type: 'internal-server-error',
      controller: 'getVisitsByCountry',
      error,
    });

    return internalServerError(res);
  }
};

export default getVisitsByCountry;
