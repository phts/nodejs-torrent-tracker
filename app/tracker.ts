/// <reference path="../typings/main.d.ts" />
import * as http from 'http';

export class Tracker {
  private server: http.Server;

  constructor () {
    this.server = http.createServer();

    this.server.on('request', function (request, response) {
      response.end('data end');
    });
  }

  start (port: number) {
    port = port || 8080;
    this.server.listen(port);
  }

  close () {
    this.server.close();
  }
}
