import { type Request, type Response } from 'express';

import * as s from '@/services/metrics/raid/getRaidAccessTrending.js';
import { internalServerError, notFound, sendJson } from '@/utils/http.js';

const getRaidAccessTrending = async (_req: Request, res: Response) => {
  try {
    const metricsJson = await s.get();

    if (!metricsJson) {
      return notFound(res);
    }

    return sendJson(res, metricsJson);
  } catch (error) {
    console.error('Error on getRaidAccessTrending service: ', error);

    return internalServerError(res);
  }
};

export default getRaidAccessTrending;
