const multer = require('multer');
const { generateId } = require('../utils/generateId');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    const uniqId = generateId();
    file.imageId = uniqId;
    cb(null , uniqId + '.jpeg');
  }
});

const uploadStorage = multer({ storage: storage });

module.exports = uploadStorage;