import { type Request, type Response } from 'express';

import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import * as s from '@/services/metrics/home/getHomeAccessMetrics';
import { todayFormatted } from '@/utils/todayFormatted';

const getHomeAccessMetrics = async (_req: Request, res: Response) => {
  try {
    const metricsJson = await s.get({ date: todayFormatted() });

    if (!metricsJson) {
      return notFound(res);
    }

    return sendJson(res, metricsJson);
  } catch (error) {
    console.error('Error on getHomeAccessMetrics service: ', error);

    return internalServerError(res);
  }
};

export default getHomeAccessMetrics;
