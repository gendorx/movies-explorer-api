const express = require('express');

const { host, port } = require('./configs');

const app = express();

app.listen(port, host);
