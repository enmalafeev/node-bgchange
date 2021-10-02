const db = require('../entities/Database');

module.exports = async (req, res) => {
  const imageId = req.params.id;

  //Todo сделать pipe readable stream in res

  res.setHeader('content-type', 'image/jpeg');

  return res.send(db.findOne(imageId).readImage(imageId));
};
