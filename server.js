const express = require('express');
const childProc = require('child_process');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');
const upload = require('./server/routes/upload');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '')));
app.use(express.static(path.join(__dirname, '/node_modules')));

// API location
app.use('/api', api);
app.use('/upload', upload);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
let firefox = 'C:\\Program Files\\Mozilla Firefox\\firefox.exe';
let chrome = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

server.listen(port, () => {
    let url = 'http://localhost:3000';
    childProc.spawn(chrome, ['-new-tab', url]);
    console.log(`Running on localhost - :${port}`);
});

module.exports = server;