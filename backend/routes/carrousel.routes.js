const express = require('express');
const carrouselRouter = express.Router();
//const carrouselData = require('./../data/carrousel.json');

const { DOMParser } = require('xmldom');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const bucketName = process.env.BUCKET_NAME;
const endpointUrl = `https://${bucketName}.s3.amazonaws.com`;

carrouselRouter.get('', (req, res) => {
const objectUrls = [];
  fetch(endpointUrl)
  .then(response => response.text())
  .then(xmlString => {
    const parser = new DOMParser();
    const xmlDocument = parser.parseFromString(xmlString, 'application/xml');
    const contentlist = xmlDocument.getElementsByTagName('Key');
    
    // Loop over key values and create urls
    for (let i = 0; i < contentlist.length; i++) {
        const objectUrl = `${endpointUrl}/${contentlist[i].textContent}`;
        objectUrls.push({url: objectUrl});
    }
    res.json(objectUrls);
  })
  .catch(err => console.error(err));
});