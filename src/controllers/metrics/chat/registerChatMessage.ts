import { type Request, type Response } from 'express';

import { internalServerError, endResponseWithCode } from '@/utils/http.js';
import * as s from '@/services/metrics/chat/registerChatMessage.js';
import { todayFormatted } from '@/utils/todayFormatted.js';

const registerChatMessage = async (_req: Request, res: Response) => {
  try {
    await s.register({ date: todayFormatted() });

    return endResponseWithCode(res, 200);
  } catch (error) {
    console.error('Error on registerChatMessage service: ', error);

    return internalServerError(res);
  }
};

export default registerChatMessage;
