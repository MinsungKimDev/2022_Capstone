const multer = require('@koa/multer');
const path = require('path');

const localUploader = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, __dirname + '/../build/uploads');
      },
      filename: function (req, file, cb) {
        console.log(file)
        const ext = path.extname(file.originalname);
        const fullPath = `${path.basename(file.originalname, ext)}_${Date.now()}${ext}`;
        cb(null, fullPath);
      }
    })
  });

exports.upload = localUploader;