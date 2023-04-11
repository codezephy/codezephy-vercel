const express = require('express');
const fetch = require('node-fetch');

const port = +process.env.PORT || 3000;
const app = express();

app.all('*', async (req, res) => {
  res.send('404: Not Found');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log('Listening on port %i', port);
  });
}

module.exports = app;
