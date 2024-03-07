const multer = require('multer');
const { v4 } = require('uuid');

const MIME_TYPE_MAP = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'uploads/images');
    },
    filename: (req, file, callback) => {
      let imgExtension = MIME_TYPE_MAP[file.mimetype];
      let imgName = v4();
      callback(null, `${imgName}.${imgExtension}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    callback(error, isValid);
  },
});

module.exports = fileUpload;
