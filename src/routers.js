const { Router } = require('express');
const storage = require('./entities/storage');

const api = require('./controllers');

const mainRouter = new Router();

// mainRouter.get('/svgs', api.getSvgs);
// mainRouter.get('/svgs/:id', api.getSvg);
mainRouter.post('/upload', storage.single('image'), api.addImage);
// mainRouter.put('/svgs/:id', svgExists, api.likeSvg);
// mainRouter.delete('/svgs/:id', api.deleteSvg);

exports.mainRouter = mainRouter;
