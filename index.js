const express = require('express');
const createHttpError = require('http-errors');
const httpStatus = require('http-status');
const codeload = require('./codeload');

const port = +process.env.PORT || 3000;
const app = express();

app.use('/codeload', codeload);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createHttpError(httpStatus.NOT_FOUND));
});

// error handler
app.use((err, req, res, next) => {
  const status = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  const response = {
    message: err.message || httpStatus[status],
  };

  if (
    req.app.get('env') !== 'production' &&
    status >= httpStatus.INTERNAL_SERVER_ERROR
  ) {
    response.stack = err.stack;
  }

  res
    .status(status)
    .json(response);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log('Listening on port %i', port);
  });
}

module.exports = app;
