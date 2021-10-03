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

    const id = await db.remove(imageId);
    return res.json({ id });
  } catch (err) {
    next(err);
  }
};
