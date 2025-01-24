import { type Request, type Response } from 'express';

import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import * as s from '@/services/metrics/raid/getRaidAccessMetrics.js';

const getRaidAccessMetrics = async (_req: Request, res: Response) => {
  try {
    const metricsJson = await s.get({ date: '20/01/2025' });

    if (!metricsJson) {
      return notFound(res);
    }

    return sendJson(res, metricsJson);
  } catch (error) {
    console.error('Error on getRaidAccessMetrics service: ', error);

    return internalServerError(res);
  }
};

export default getRaidAccessMetrics;
