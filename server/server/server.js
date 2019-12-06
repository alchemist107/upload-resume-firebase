const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
const { format } = require('util');

const storage = new Storage({
  projectId: 'smartresume-631e2',
  keyFilename: './smartresume-631e2-firebase-adminsdk-gjkni-d9ec3cc247.json',
});

const bucket = storage.bucket('gs://smartresume-631e2.appspot.com');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const { getSecret } = require('./secrets');
const usersRoute = require('./routes/users');

mongoose.Promise = global.Promise;
mongoose.connect(getSecret('dbUri')).then(
  () => {
    console.log('Connected to mongoDB');
  },
  (err) => console.log('Error connecting to mongoDB', err)
);

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://0.0.0.0:3002',
      'http://0.0.0.0:3001',
      'http://localhost:3001/explore.json',
      'http://35.204.35.64',
      'http://35.204.35.64:3000',
    ],
    credentials: true,
  })
);

//app.use(bodyParser.json());
//app.use(cookieParser());
//app.use('/api/users', usersRoute);

app.post('/upload', multer.single('fileUpload'), (req, res) => {
  console.log('Upload Image');

  let file = req.file;
  if (file) {
    uploadImageToStorage(file)
      .then((success) => {
        res.status(200).send({
          status: 'success',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    console.log(file);
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      console.log(error);
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(
        `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`
      );
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { app };
