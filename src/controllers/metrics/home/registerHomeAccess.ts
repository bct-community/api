import { type Request, type Response } from 'express';
import { z } from 'zod';

import { internalServerError, endResponseWithCode } from '@/utils/http.js';
import * as s from '@/services/metrics/home/registerHomeAccess.js';
import { todayFormatted } from '@/utils/todayFormatted.js';

const bodySchema = z.object({
  country: z.string().nonempty('Country is required'),
});

const registerHomeAccess = async (req: Request, res: Response) => {
  const result = bodySchema.safeParse(req.body);

  if (!result.success) {
    return endResponseWithCode(res, 400);
  }

  const { country } = result.data;

  try {
    await s.register({ country, date: todayFormatted() });

    return endResponseWithCode(res, 200);
  } catch (error) {
    console.error('Error on registerHomeAccess service: ', error);

    return internalServerError(res);
  }
};

export default registerHomeAccess;
