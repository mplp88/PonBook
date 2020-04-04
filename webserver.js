let express = require('express');
let serveStatic = require('serve-static');
let app = express();
app.use(serveStatic(__dirname + "/dist"));
let port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on  http://localhost:'+ port);