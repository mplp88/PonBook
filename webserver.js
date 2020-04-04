let express = require('express');
let serveStatic = require('serve-static');
let app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use
let port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on  http://localhost:'+ port);