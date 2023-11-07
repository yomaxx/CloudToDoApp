const express = require('express');
const AWS = require('aws-sdk');
const carrouselRouter = express.Router();

AWS.config.update({
  accessKeyId: '${AWS_ACCESS_KEY_ID}}',
  secretAccessKey: '${AWS_SECRET_ACCESS_KEY}',
  SessionToken: '${AWS_SESSION_TOKEN}',
  region: 'us-east-1'
});

const s3 = new AWS.S3();

const BUCKET_NAME ='${BUCKET_NAME}';

const s3Params = {
    Bucket:'${BUCKET_NAME}'
  };

carrouselRouter.get('', (req, res) => {

  // List objects from the specified S3 bucket prefix
  s3.listObjectsV2(s3Params, function (err, data) {
    if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Format the output as {"url":"key"}
        const formattedData = data.Contents.map(item => {
            return { url: `https://${s3Params.Bucket}.s3.amazonaws.com/${item.Key}` };
        }
        );
        res.json(formattedData);
    }

  });
});

module.exports = carrouselRouter;