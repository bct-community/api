import { type Request, type Response } from 'express';
import { z } from 'zod';

import { internalServerError, endResponseWithCode } from '@/utils/http.js';
import * as s from '@/services/metrics/visits/registerVisits.js';
import { todayFormatted } from '@/utils/todayFormatted.js';

const bodySchema = z.object({
  country: z.string().nonempty('Country is required'),
});

const registerVisit = async (req: Request, res: Response) => {
  const result = bodySchema.safeParse(req.body);

  if (!result.success) {
    return endResponseWithCode(res, 400);
  }

  const { country } = result.data;

  try {
    await s.register({ country, date: todayFormatted() });

    return endResponseWithCode(res, 200);
  } catch (error) {
    console.error('Error on registerVisit service: ', error);

    return internalServerError(res);
  }
};

export default registerVisit;
