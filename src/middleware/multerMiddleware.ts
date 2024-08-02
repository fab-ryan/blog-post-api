/* eslint-disable import/no-extraneous-dependencies */
import multer, { FileFilterCallback } from 'multer';
import fs from 'fs';
import path from 'path';

export const filterFile = (
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const formatFileName = (fileName: string) => {
  return fileName.split(' ').join('_').toLowerCase();
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');

    // Ensure the uploads directory exists
    fs.mkdir(uploadDir, { recursive: true }, err => {
      if (err) {
        return cb(new Error('Error in creating uploads folder'), '');
      }
      cb(null, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    const fileNameWithoutExt = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    const uniqueSuffix = `${fileNameWithoutExt}-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${formatFileName(uniqueSuffix)}${path.extname(file.originalname)}`
    );
  },
});

export const multerUploads = multer({
  storage,
  fileFilter: (req, file, cb: FileFilterCallback) => {
    filterFile(file, cb);
  },
});
