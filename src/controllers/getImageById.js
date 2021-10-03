const db = require('../entities/Database');
const { exists } = require('../utils/fs');
const { NotFoundApiError } = require('../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  const imageId = req.params.id;
  const imageRaw = db.findOne(imageId);

  try {
    const pathToFile = imageRaw.getImagePath(imageId);
    const isFileExists = await exists(pathToFile);

    if (!isFileExists) {
      throw new NotFoundApiError('Image file not found');
    }

    return res.download(pathToFile);
  } catch (err) {
    next(err);
  }
};
