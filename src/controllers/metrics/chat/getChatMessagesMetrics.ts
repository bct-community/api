import { type Request, type Response } from 'express';

import { internalServerError, notFound, sendJson } from '@/utils/http.js';
import * as s from '@/services/metrics/chat/getChatMessagesMetrics.js';
import { todayFormatted } from '@/utils/todayFormatted.js';

const getChatMessagesMetrics = async (_req: Request, res: Response) => {
  try {
    const metricsJson = await s.get({ date: todayFormatted() });

    if (!metricsJson) {
      return notFound(res);
    }

    return sendJson(res, metricsJson);
  } catch (error) {
    console.error('Error on getChatMessagesMetrics service: ', error);

    return internalServerError(res);
  }
};

export default getChatMessagesMetrics;
