'use strict';
var expect = require('chai').expect;
var http = require('http');

describe('Tracker', function () {
  const PORT = 8787;
  var Tracker = require('../../release/tracker').Tracker,
    tracker;

  beforeEach(function () {
    tracker = new Tracker();
    tracker.start(PORT);
  });

  afterEach(function () {
    tracker.close();
  });

  describe('/', function () {
    const URL = `http://localhost:${PORT}`;

    it('has status 200', function (done) {
      http.get(URL, function (response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('prints "data end"', function (done) {
      http.get(URL, function (response) {
        var data = '';

        response.on('data', function (chunk) {
          data += chunk;
        });

        response.on('end', function () {
          expect(data).to.equal('data end');
          done();
        });
      });
    });
  });
});
