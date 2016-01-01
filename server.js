/* eslint no-console: 0 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const winston = require('winston');
const cors = require('cors');
const bodyParser = require('body-parser');

const pathToDataFile = path.join(__dirname, './data.json').toString();

const app = express();
const PORT = process.env.PORT || 3000;
const DOMAIN = '0.0.0.0';

const config = require('./webpack.config');
const compiler = webpack(config);

if (process.env.NODE_ENV !== 'production') {
  winston.info('Bundling webpack... Please wait.');

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static('public'));
app.use(bodyParser.json());

app.options('/api/notes', cors());
app.get('/api/notes', cors(), function(req, res) {
  if (! fs.existsSync(pathToDataFile)) {
    res.send({
      ordered: [],
      byId: {}
    });
  } else {
    const json = fs.readFileSync(pathToDataFile);
    const data = JSON.parse(json);
    res.send(data);
  }
});

app.post('/api/notes', cors(), function(req, res) {
  const data = JSON.stringify(req.body, null, 2);
  fs.writeFileSync(pathToDataFile, data);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening at http://${ DOMAIN }:${ PORT }`);
});
