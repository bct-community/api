import { type Request, type Response } from 'express';
import fs from 'fs';
import path from 'path';
import type { UploadApiOptions } from 'cloudinary';

import { endResponseWithCode, internalServerError } from '@/utils/http.js';
import { cloudinaryConnection } from '@/utils/connectToCloudinary.js';
import { ArtsModel } from '@/models/arts/index.js';

const register = async (req: Request, res: Response) => {
  try {
    const { creator, xProfile, description } = req.body;
    const imageFile = req.file;

    const imageName = imageFile?.originalname;

    if (!imageFile || !imageFile.buffer) {
      return endResponseWithCode(res, 400);
    }

    if (!creator || !xProfile || !description) {
      return endResponseWithCode(res, 400);
    }

    const uploadDir = path.resolve('./src/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `img_${imageName}_${Date.now()}.jpg`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, imageFile.buffer);

    const options: UploadApiOptions = {
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    };

    const result = await cloudinaryConnection.uploader.upload(
      filePath,
      options
    );

    const { secure_url: url, display_name: name } = result;

    const newImage = new ArtsModel({
      name,
      creator,
      xProfile,
      description,
      url,
    });

    await newImage.save();

    fs.unlinkSync(filePath);

    endResponseWithCode(res, 201);
  } catch (error) {
    console.error('Erro ao processar imagem:', error);
    internalServerError(res);
  }
};

export default register;
