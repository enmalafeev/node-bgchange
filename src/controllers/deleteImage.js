const db = require('../entities/Database');
const { NotFoundApiError } = require('../validators/errors/ApiError');

module.exports = async (req, res) => {
  const imageId = req.params.id;
  try {
    const id = await db.remove(imageId);
    return res.json({ id });
  } catch (err) {
    throw new NotFoundApiError(`Image with ${imageId} doesn't exist`)
  }
};
