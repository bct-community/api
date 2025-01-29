import { endResponseWithCode } from '@/utils/http.js';
import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';

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

const imageHandler = (_req: Request, res: Response, next: NextFunction) => {
  upload(_req, res, function (err) {
    if (err) endResponseWithCode(res, 400);

    next();
  });
};

export { imageHandler };
