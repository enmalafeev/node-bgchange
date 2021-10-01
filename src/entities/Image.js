const { generateId } = require('../utils/generateId');

module.exports = class Image {
  constructor(id, size, uploadedAt) {
    this.id = id || generateId();

    this.size = size;
    
    this.uploadedAt = uploadedAt || Date.now();
  }

  toPublicJSON() {
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
