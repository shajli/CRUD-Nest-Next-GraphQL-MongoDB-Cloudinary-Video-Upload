import { extname } from 'path';

export const videoUploadCdn = (req, file, cb) => {
  cb(null, 'd:\\cdn\\uploads');
};

export const videoFileName = (req, file, cb) => {
  const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
  const uploadedFileName = uniqueSuffix + '_' + file.originalname;

  cb(null, uploadedFileName);
};

export const videoFilter = (req, file, cb) => {
  const ext = extname(file.originalname);
  if (ext !== '.mp4') cb(null, false);
  else cb(null, true);
};
