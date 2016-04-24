/// <reference path="../typings/main.d.ts" />

var http = require('http');

const PORT = 8080;

var server = http.createServer(function (request, response) {
});

server.listen(PORT, function () {
  console.log('Server listening on: http://localhost:%s', PORT);
})
