import { type Request, type Response } from 'express';

import { internalServerError, endResponseWithCode } from '@/utils/http.js';
import * as s from '@/services/metrics/raid/registerRaidAccess.js';
import { todayFormatted } from '@/utils/todayFormatted.js';

const registerRaidAccess = async (_req: Request, res: Response) => {
  try {
    await s.register({ date: todayFormatted() });

    return endResponseWithCode(res, 200);
  } catch (error) {
    console.error('Error on registerRaidAccess service: ', error);

    return internalServerError(res);
  }
};

export default registerRaidAccess;
