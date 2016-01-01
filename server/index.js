var express= require('express');
var compression = require('compression');
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

var static_path = path.join(__dirname, './../build');

app.enable('trust proxy');

app.use(compression());
app.use(bodyParser.json());

var pathToDataFile = path.join(__dirname, '../../data.json').toString();

app.options('/api/notes', cors());
app.get('/api/notes', cors(), function(req, res) {
  console.log('pathToDataFile', pathToDataFile);
  if (! fs.existsSync(pathToDataFile)) {
    res.send({
      ordered: [],
      byId: {}
    });
  } else {
    var json = fs.readFileSync(pathToDataFile);
    var data = JSON.parse(json);
    res.send(data);
  }
});

app.post('/api/notes', cors(), function(req, res) {
  var data = JSON.stringify(req.body, null, 2);
  fs.writeFileSync(pathToDataFile, data);
});

app.route('/').get(function(req, res) {
    res.header('Cache-Control', "max-age=60, must-revalidate, private");
    res.sendFile('index.html', {
        root: static_path
    });
});

function nocache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

app.use('/', express.static(static_path, {
    maxage: 31557600
}));

var server = app.listen(process.env.PORT || 5000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});