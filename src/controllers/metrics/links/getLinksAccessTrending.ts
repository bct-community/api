import { type Request, type Response } from 'express';

import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import * as s from '@/services/metrics/links/getLinksAccessTrending.js';

const getLinksAccessTrending = async (_req: Request, res: Response) => {
  try {
    const metricsJson = await s.get();

    if (!metricsJson) {
      return notFound(res);
    }

    return sendJson(res, metricsJson);
  } catch (error) {
    console.error('Error on getLinksAccessTrending service: ', error);

    return internalServerError(res);
  }
};

export default getLinksAccessTrending;
