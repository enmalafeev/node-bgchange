const path = require('path');
const { generateId } = require('../utils/generateId');
const { unlink } = require('fs/promises');

module.exports = class Image {
  constructor(id, size, uploadedAt) {
    this.id = id || generateId();

    this.size = size;
    
    this.uploadedAt = uploadedAt || Date.now();

    this.originalUrl = `/uploads/${this.id}.jpeg`;
  }

  async removeImage(imageId) {
    const pathToImg = path.resolve(__dirname, '../../uploads', `${imageId}.jpeg`);

    await unlink(pathToImg);
  }

  getImagePath(imageId) {
   return path.resolve(__dirname, '../../uploads', `${imageId}.jpeg`);
  }



  toListJSON() {
    return {
      id: this.id,
      size: this.size,
      uploadedAt: this.uploadedAt
    };
  }

  toIdJSON() {
    return {
      id: this.id,
    };
  }

  toJSON() {
    return {
      id: this.id,
      size: this.size,
      originalUrl: `/uploads/${this.id}.jpeg`,
      uploadedAt: this.uploadedAt,
    };
  }
};
