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

let params = {
    Bucket: process.env.AWS_BUCKET,
    ACL: 'public-read-write'
};

let S3Storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        console.log(file)
        cb(null, `${Date.now().toString()}-${file.originalname}`)
    }
})

exports.upload = multer({storage: S3Storage});
