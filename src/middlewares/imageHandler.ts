import { endResponseWithCode } from '@/utils/http.js';
import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import sharp from 'sharp';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images are allowed!'));
    }

    cb(null, true);
  },
}).single('image');

const imageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, async function (err) {
    if (err) return endResponseWithCode(res, 400);

    if (!req.file) return endResponseWithCode(res, 400);

    try {
      const compressedImage = await sharp(req.file.buffer)
        .resize(800)
        .jpeg({ quality: 80 })
        .toBuffer();

      req.file.buffer = compressedImage;
      next();
    } catch (error) {
      return endResponseWithCode(res, 500);
    }
  });
};

export { imageHandler };
