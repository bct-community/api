import { type Request, type Response } from 'express';
import { z } from 'zod';

import * as s from '@/services/metrics/visits/registerVisits.js';
import { endResponseWithCode, internalServerError } from '@/utils/http.js';
import { todayFormatted } from '@/utils/todayFormatted.js';
import logError from '@/utils/logError.js';

const bodySchema = z.object({
  country: z.string().nonempty('Country is required'),
});

const registerVisit = async (req: Request, res: Response) => {
  const result = bodySchema.safeParse(req.body);

  if (!result.success) {
    logError({
      type: 'bad-request',
      controller: 'registerVisit',
      error: result.error,
    });

    return endResponseWithCode(res, 400);
  }

  const { country } = result.data;

  try {
    await s.register({ country, date: todayFormatted() });

    return endResponseWithCode(res, 200);
  } catch (error) {
    logError({
      type: 'internal-server-error',
      controller: 'registerVisit',
      error,
    });

    return internalServerError(res);
  }
};

export default registerVisit;
