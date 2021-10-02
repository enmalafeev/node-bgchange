const db = require('../entities/Database');
const Image = require('../entities/Image');
const { BadRequestApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  try {
    const { imageId, size } = req.file;
    const uploaded = Date.now();

    if (!req.file) {
      throw new BadRequestApiError('Image content should not be empty');
    }

    const imageFile = new Image(imageId, size, uploaded);

    await db.insert(imageFile);

    res.status = 201;
    return res.json(imageFile.toIdJSON());
  } catch (err) {
    return next(err);
  }
};
