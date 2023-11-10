module.exports = carrouselRouter;

const express = require('express');
const carrouselRouter = express.Router();
const AWS = require('aws-sdk'); // Importeer de AWS SDK
const s3 = new AWS.S3();

const BUCKET_NAME = '${BUCKET_NAME}'; // Vervang dit door je daadwerkelijke S3-bucketnaam

carrouselRouter.get('', (req, res) => {
  // Gebruik de AWS SDK om een lijst van objecten (afbeeldingen) in het S3-bucket op te halen
  const params = {
    Bucket: BUCKET_NAME,
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Fout bij het ophalen van afbeeldingen uit S3');
    } else {
      // Doorloop de lijst van objecten en genereer de URL's op basis van het bucket en objectpad
      const images = data.Contents.map((object) => {
        const imageUrl = s3.getSignedUrl('getObject', {
          Bucket: BUCKET_NAME,
          Key: object.Key,
        });
        return { url: imageUrl }; // Geef het "url" -sleutel- en "waarde" -formaat terug
      });

      res.json(images);
    }
  });
});

module.exports = carrouselRouter;