import { type Request, type Response } from 'express';

import { endResponseWithCode, internalServerError } from '@/utils/http.js';
import { register } from '@/services/arts/registerArt.js';
import logError from '@/utils/logError.js';

const registerArt = async (req: Request, res: Response) => {
  try {
    const { creator, xProfile, description } = req.body;
    const imageFile = req.file;

    const imageName = imageFile?.originalname;

    if (!imageFile || !imageFile.buffer || !imageName) {
      console.error('[bad-request] --> registerArt: ', {
        imageFile,
        imageName,
      });
      return endResponseWithCode(res, 400);
    }

    if (!creator || !xProfile || !description) {
      console.error('[bad-request] --> registerArt: ', {
        creator,
        xProfile,
        description,
      });
      return endResponseWithCode(res, 400);
    }

    await register({ creator, xProfile, description, imageName, imageFile });

    endResponseWithCode(res, 201);
  } catch (error) {
    logError({
      type: 'internal-server-error',
      controller: 'registerArt',
      error,
    });

    internalServerError(res);
  }
};

export default registerArt;
