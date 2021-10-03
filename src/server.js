const express = require('express');
const { PORT } = require('./config');
const { mainRouter } = require('./routers');
const setupMiddlewares = require('./middlewares');
const errorHandler = require('./middlewares/errorHandler');


const app = express();

setupMiddlewares(app);

app.use('uploads', express.static('uploads'));

app.use('/', mainRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


