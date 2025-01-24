import { type Request, type Response } from 'express';
import { z } from 'zod';

import { internalServerError, endResponseWithCode } from '@/utils/http.js';
import * as s from '@/services/metrics/links/registerLinkAccess.js';
import { todayFormatted } from '@/utils/todayFormatted.js';

const bodySchema = z.object({
  linkId: z.string().nonempty('linkId is required'),
});

const registerLinkAccess = async (req: Request, res: Response) => {
  const result = bodySchema.safeParse(req.body);

  if (!result.success) {
    return endResponseWithCode(res, 400);
  }

  const { linkId } = result.data;

  try {
    await s.register({ date: todayFormatted(), linkId });

    return endResponseWithCode(res, 200);
  } catch (error) {
    console.error('Error on registerLinkAccess service: ', error);

    return internalServerError(res);
  }
};

export default registerLinkAccess;
