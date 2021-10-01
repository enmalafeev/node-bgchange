const express = require('express');
const { PORT } = require('./config');
const { mainRouter } = require('./routers');


const app = express();

app.use('uploads', express.static('uploads'));

app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


