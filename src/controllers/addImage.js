const db = require('../entities/Database');
const Image = require('../entities/Image');
// const { BadRequestApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  try {
    const { imageId, size } = req.file;
    const uploaded = Date.now();

    // if (!content) {
    //   throw new BadRequestApiError('SVG content should not be empty');
    // }

    const imageFile = new Image(imageId, size, uploaded);

    await db.insert(imageFile);

    return res.json(imageFile.toPublicJSON());
  } catch (err) {
    return next(err);
  }
};
