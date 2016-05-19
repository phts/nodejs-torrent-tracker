"use strict";
/// <reference path="../typings/main.d.ts" />
var http = require('http');
var url = require('url');
var errors = require('./tracker-errors');
var Tracker = (function () {
    function Tracker() {
        this.server = http.createServer();
        this.server.on('request', this.onRequest.bind(this));
    }
    Tracker.prototype.start = function (port) {
        port = port || 8080;
        this.server.listen(port);
    };
    Tracker.prototype.close = function () {
        this.server.close();
    };
    Tracker.prototype.onRequest = function (request, response) {
        var u = url.parse(request.url, true);
        try {
            if (request.method !== 'GET') {
                throw new errors.NotFoundError();
            }
            if (u.pathname !== '/announce') {
                throw new errors.NotFoundError();
            }
        }
        catch (err) {
            if (err instanceof errors.TrackerError) {
                response.statusCode = err.statusCode;
            }
            else {
                response.statusCode = 500;
            }
        }
        response.end();
    };
    return Tracker;
}());
exports.Tracker = Tracker;
