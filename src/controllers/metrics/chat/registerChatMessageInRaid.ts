import { type Request, type Response } from 'express';

import { internalServerError, endResponseWithCode } from '@/utils/http.js';
import * as s from '@/services/metrics/chat/registerChatMessageInRaid.js';
import { todayFormatted } from '@/utils/todayFormatted.js';

const registerChatMessageInRaid = async (_req: Request, res: Response) => {
  try {
    await s.register({ date: todayFormatted() });

    return endResponseWithCode(res, 200);
  } catch (error) {
    console.error('Error on registerChatMessageInRaid service: ', error);

    return internalServerError(res);
  }
};

export default registerChatMessageInRaid;
