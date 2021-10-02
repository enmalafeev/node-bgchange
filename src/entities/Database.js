const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { dbDumpFile } = require('../config');
const { writeFile } = require('fs/promises');
const Image = require('./Image');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString');

class Database extends EventEmitter {
  constructor() {
    super();

    this.idToImage = {};
  }

  async initFromDump() {
    if (existsSync(dbDumpFile) === false) {
      return;
    }

    const dump = require(dbDumpFile);

    if (typeof dump.idToImage === 'object') {
      this.idToImage = {};

      for (let id in dump.idToImage) {
        const image = dump.idToImage[id];

        this.idToImage[id] = new Image(image.id, image.size, image.uploadedAt);
      }
    }

    if (typeof dump.idToImage === 'object') {
      this.idToImage = { ...dump.idToImage };
    }
  }

  async insert(image) {
    this.idToImage[image.id] = image;

    this.emit('changed');
  }

  async remove(imageId) {
    const imageRaw = this.idToImage[imageId];
    
    const image = new Image(imageRaw.id, imageRaw.size, imageRaw.uploadedAt);
    
    await image.removeImage(imageId);
    delete this.idToImage[imageId];

    this.emit('changed');

    return imageId;
  }

  findOne(imageId) {
    const imageRaw = this.idToImage[imageId];

    if (!imageId) {
      return null;
    }

    const image = new Image(imageRaw.id, imageRaw.size, imageRaw.createdAt);

    return image;
  }

  find() {
    let allImages = Object.values(this.idToImage);

    allImages.sort((imgA, imgB) => imgB.uploadedAt - imgA.uploadedAt);

    return allImages;
  }

  toJSON() {
    return {
      idToImage: this.idToImage,
    };
  }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;
