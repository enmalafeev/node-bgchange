const { replaceBackground } = require('backrem');
const db = require('../entities/Database');
const { exists, createReadStream } = require('../utils/fs');
const {
  BadRequestApiError,
  NotFoundApiError,
} = require('../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  const { front, back, color, threshold } = req.query;

  try {
    if (!front || !back) {
      throw new BadRequestApiError('Get parameter `front` should not be empty');
    }

    if (!back) {
      throw new BadRequestApiError('Get parameter `back` should not be empty');
    }

    const mainImage = db.findOne(front);
    const backgroundImage = db.findOne(back);

    const pathToMainImageFile = mainImage.getImagePath(front);
    const pathToBackgroundImageFile = backgroundImage.getImagePath(back);

    const isFileExists = await Promise.all([
      exists(pathToMainImageFile),
      exists(pathToBackgroundImageFile),
    ]);

    if (!isFileExists) {
      throw new NotFoundApiError('Image file not found');
    }

    const mainImageStream = createReadStream(pathToMainImageFile);
    const backgroundImageStream = createReadStream(pathToBackgroundImageFile);

    const readableStream = await replaceBackground(
      mainImageStream,
      backgroundImageStream,
      color?.split(',').map(str => Number(str)),
      threshold
    );

    res.setHeader('Content-Type', 'image/jpeg');
    readableStream.pipe(res);
  } catch (err) {
    next(err);
  }
};