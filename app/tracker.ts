/// <reference path="../typings/index.d.ts" />
import * as http from 'http';
import * as url from 'url';
import * as errors from './tracker-errors';

export class Tracker {
  private server: http.Server;

  constructor () {
    this.server = http.createServer();
    this.server.on('request', this.onRequest.bind(this));
  }

  start (port: number) {
    port = port || 8080;
    this.server.listen(port);
  }

  close () {
    this.server.close();
  }

  private onRequest(request: http.IncomingMessage, response: http.ServerResponse) {
    var u = url.parse(request.url, true);
    try {
      if (request.method !== 'GET') {
        throw new errors.NotFoundError();
      }
      if (u.pathname !== '/announce') {
        throw new errors.NotFoundError();
      }
    } catch (err) {
      if (err instanceof errors.TrackerError) {
        response.statusCode = err.statusCode;
      } else {
        response.statusCode = 500;
      }
    }
    response.end();
  }
}
