'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Issue = require('./Issue.js');

var _Issue2 = _interopRequireDefault(_Issue);

var _mongodb = require('mongodb');

require('babel-polyfill');

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sourceMapSupport2.default.install();

var app = (0, _express2.default)();

throw new Error("Test!");

// Mongo db
var db = void 0;

_mongodb.MongoClient.connect('mongodb://localhost/issuetracker').then(function (connection) {
    db = connection;
    app.listen(3000, function () {
        console.log('App started on port 3000');
    });
}).catch(function (error) {
    console.log('Connection error: ', error);
});

// Static and body parser
app.use(_express2.default.static('static'));
app.use(_bodyParser2.default.json());

if (process.env.NODE_ENV !== 'production') {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');

    var config = require('../webpack.config');
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    var bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, { noInfo: true }));
    app.use(webpackHotMiddleware(bundler, { log: console.log }));
}

app.get('/api/issues', function (req, res) {
    db.collection('issues').find().toArray().then(function (issues) {
        var metadata = { total_count: issues.length };
        res.json({ _metadata: metadata, records: issues });
    }).catch(function (error) {
        console.log('ERROR: ', error);
        res.status(500).json({ message: 'Internal Server Error: ' + error });
    });
});

app.post('/api/issues', function (req, res) {
    var newIssue = req.body;
    newIssue.created = new Date();
    !newIssue.status ? newIssue.status = 'New' : null;

    var err = _Issue2.default.validateIssue(newIssue);
    if (err) {
        res.status(422).json({ message: 'Invalid request ' + err });
        return;
    }

    db.collection('issues').insertOne(newIssue).then(function (result) {
        return db.collection('issues').find({ _id: result.insertedId }).limit(1).next();
    }).then(function (newIssues) {
        return res.json(newIssues);
    }).catch(function (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server Error: ' + err });
    });
    res.json(newIssue);
});
//# sourceMappingURL=server.js.map