var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(express.static(__dirname + '/public'));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/loadCategories', function(req, res) {
  var _categories = [
    {
      name: "Scales",
      id: 1,
      entries: [
      {
        name: 'C-Major',
        id: 1,
        best: {
          value: 120,
          date: '1/11/1111'
        },
        recent: {
          value: 150,
          date: '1/11/1111'
        }
      }],
    },
    {
      name: "Arpeggios",
      id: 2,
      entries: [
        {
          id: 1,
          name: 'D-Major',
          best: {
            value: 90,
            date: '1/11/1111'
          },
          recent: {
            value: 60,
            date: '1/11/1111'
          }
        },
        {
          id: 2,
          name: 'E-Major',
          best: {
            value: 60,
            date: '1/11/1111'
          },
          recent: {
            value: 50,
            date: '1/11/1111'
          }
        }
      ]
      }
  ];
  res.json({categories: _categories});
});




app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
