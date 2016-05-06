/// <reference path="../typings/main.d.ts" />
import * as http from 'http';

export class Tracker {
  private server: http.Server;

  constructor () {
    this.server = http.createServer();

    this.server.on('close', function () {
      console.log('close');
    });

    this.server.on('request', function (request, response) {
      console.log('request', request.method, request.socket.address(), request.socket.remoteAddress);
      response.end('data end');
    });

    this.server.on('clientError', function (err, socket) {
      console.log('clientError', err, socket);
    });
  }

  start (port: number) {
    port = port || 8080;
    this.server.listen(port, function () {
      console.log('Server listening on: http://localhost:%s', port);
    });
  }

  close () {
    this.server.close();
  }
}
