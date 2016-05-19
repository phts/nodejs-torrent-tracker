'use strict';
var expect = require('chai').expect;
var http = require('http');

describe('Tracker', function () {
  const PORT = 8787;
  var Tracker = require('../app/tracker').Tracker,
    tracker;

  beforeEach(function () {
    tracker = new Tracker();
    tracker.start(PORT);
  });

  afterEach(function () {
    tracker.close();
  });

  describe('GET /', function () {
    var URL = `http://localhost:${PORT}`;

    it('has status 404', function (done) {
      http.get(URL, function (response) {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });

  describe('GET /announce', function () {
    var URL = `http://localhost:${PORT}/announce`;

    it('has status 200', function (done) {
      http.get(URL, function (response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
