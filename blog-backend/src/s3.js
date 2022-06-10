require('dotenv').config();

const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('@koa/multer');
const multerS3 = require('multer-s3');
const path = require('path');

const s3 = new S3Client({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

let S3Storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    contentType:multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        console.log(file)
        const ext = path.extname(file.originalname);
        cb(null, `${path.basename(file.originalname, ext)}${Date.now()}${ext}`)
    },
    ACL: 'public-read-write',
    contentDisposition: 'attachment',
    serverSideEncryption: 'AES256'

})

exports.upload = multer({storage: S3Storage});
