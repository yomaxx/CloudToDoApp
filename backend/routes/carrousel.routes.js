const express = require('express');
const AWS = require('aws-sdk');
const carrouselRouter = express.Router();

// Configure AWS SDK with your credentials and region
AWS.config.update({
  accessKeyId: '${AWS_ACCESS_KEY_ID}}',
  secretAccessKey: '${AWS_SECRET_ACCESS_KEY}',
  region: 'US-EAST-1'
});

const s3 = new AWS.S3();

const BUCKET_NAME ='${BUCKET_NAME}';

carrouselRouter.get('', (req, res) => {
  // Specify the S3 bucket key/prefix for your images
  const s3Params = {
    Bucket: BUCKET_NAME,
    Prefix: 'images/' // adjust the prefix based on your S3 bucket structure
  };

  // List objects from the specified S3 bucket prefix
  s3.listObjectsV2(s3Params, (err, data) => {
    if (err) {
      console.error('Error fetching images from S3:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Extract the image URLs from the S3 response
      const imageUrls = data.Contents.map(item => {
        return `https://${BUCKET_NAME}.s3.amazonaws.com/${item.Key}`;
      });

      res.json(imageUrls);
    }
  });
});

module.exports = carrouselRouter;