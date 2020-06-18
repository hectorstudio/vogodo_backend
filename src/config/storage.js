const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({ 
  keyFilename: path.join(__dirname, '..', 'constants', 'key.json')
});
const filesBucket = storage.bucket('selldealsnow');
module.exports = filesBucket;
