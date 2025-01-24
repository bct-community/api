import { type Request, type Response } from 'express';

import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import * as s from '@/services/metrics/visits/getVisitsByCountry.js';

const getVisitsByCountry = async (_req: Request, res: Response) => {
  try {
    const metricsJson = await s.get();

    if (!metricsJson) {
      return notFound(res);
    }

    return sendJson(res, metricsJson);
  } catch (error) {
    console.error('Error on getVisitsByCountry service: ', error);

    return internalServerError(res);
  }
};

export default getVisitsByCountry;
