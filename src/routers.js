const { Router } = require('express');
const storage = require('./entities/storage');

const api = require('./controllers');

const mainRouter = new Router();

mainRouter.get('/list', api.getImages);
mainRouter.get('/image/:id', api.getImageById);
mainRouter.post('/upload', storage.single('image'), api.addImage);
mainRouter.delete('/image/:id', api.deleteImage);
mainRouter.get('/merge', api.changeImageBg);

exports.mainRouter = mainRouter;
