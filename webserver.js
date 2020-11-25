let express = require('express');
let serveStatic = require('serve-static');
let server = require('./server/server');
let app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(server);
let port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on  http://localhost:' + port);