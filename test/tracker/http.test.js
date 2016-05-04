var assert = require('assert');
var http = require('http');
var t = require('../../release/tracker');

describe('Tracker', function () {
  const PORT = 8787;
  var tracker;

  beforeEach(function () {
    tracker = new t.Tracker();
    tracker.start(PORT);
  });

  afterEach(function () {
    tracker.close();
  });

  describe('/', function () {
    const URL = `http://localhost:${PORT}`;

    it('has status 200', function (done) {
      http.get(URL, function (response) {
        assert.equal(200, response.statusCode);
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
          assert.equal('data end', data);
          done();
        });
      });
    });
  });
});
