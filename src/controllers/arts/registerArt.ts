import { type Request, type Response } from 'express';

import { endResponseWithCode, internalServerError } from '@/utils/http.js';
import { register } from '@/services/arts/registerArt.js';

const registerArt = async (req: Request, res: Response) => {
  try {
    const { creator, xProfile, description } = req.body;
    const imageFile = req.file;

    const imageName = imageFile?.originalname;

    if (!imageFile || !imageFile.buffer || !imageName) {
      console.error('registerArt badRequest: ', { imageFile, imageName });
      return endResponseWithCode(res, 400);
    }

    if (!creator || !xProfile || !description) {
      console.error('registerArt badRequest: ', {
        creator,
        xProfile,
        description,
      });
      return endResponseWithCode(res, 400);
    }

    await register({ creator, xProfile, description, imageName, imageFile });

    endResponseWithCode(res, 201);
  } catch (error) {
    console.error('Error on register art service: ', error);
    internalServerError(res);
  }
};

export default registerArt;
