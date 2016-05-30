/// <reference path="../typings/index.d.ts" />
import * as http from 'http';
import * as url from 'url';
import * as errors from './tracker-errors';
import AnnounceGetRequestParams from './announce-get-request-params'
import TrackerService from './tracker-service';
import * as bencode from 'bencode';
import * as _ from 'lodash';

interface TrackerOptions {
  verbose?: boolean;
}

export default class Tracker {
  private DEFAULTS: TrackerOptions = {
    verbose: false,
  };

  private options: TrackerOptions;
  private service: TrackerService;
  private server: http.Server;

  constructor(options: TrackerOptions) {
    this.options = _.defaults({}, options, this.DEFAULTS);
    this.service = new TrackerService();
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
    var u = url.parse(request.url, true),
      data;
    if (this.options.verbose) {
      console.log('request', request.method, request.url, request.socket.remoteAddress);
    }
    try {
      if (request.method !== 'GET') {
        throw new errors.NotFoundError();
      }
      if (u.pathname === '/announce') {
        let params = new AnnounceGetRequestParams(u.query);
        if (this.options.verbose) {
          console.log('/announce', params);
        }
        data = this.service.announce(params);
      } else {
        throw new errors.NotFoundError();
      }
    } catch (err) {
      if (err instanceof errors.TrackerError) {
        response.statusCode = err.statusCode;
      } else {
        response.statusCode = 500;
      }
      data = err.message;
    }
    if (this.options.verbose) {
      console.log('response', response.statusCode, data);
    }
    response.setHeader('Content-Type', 'text/plain');
    response.end(bencode.encode(data));
  }
}
