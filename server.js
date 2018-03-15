const http = require('http');
const app = require('./app');
const user = require('./api/models/user');
const table = require('./api/models/table');
const category = require('./api/models/category');
const product = require('./api/models/product');


const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port);