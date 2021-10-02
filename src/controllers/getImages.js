const db = require('../entities/Database');

module.exports = (req, res) => {
  const allImages = db.find().map((img) => ({ id: img.id, size: img.size, uploadedAt: img.uploadedAt }));
  return res.json({ allImages });
};
