'use strict';
var expect = require('chai').expect;
var sinon = require('sinon');
var http = require('http');

describe('Tracker', function () {
  const PORT = 8787;
  var Tracker = require('../release/tracker').Tracker,
    TrackerService = require('../release/tracker-service').default,
    bencode = require('bencode'),
    tracker,
    url;

  before(function () {
    sinon.stub(bencode, 'encode', function (data) {
      return 'encoded-'+data;
    });
    TrackerService.prototype.announce = function() {
      return new Error();
    };
  });

  beforeEach(function () {
    tracker = new Tracker();
    tracker.start(PORT);
  });

  afterEach(function () {
    tracker.close();
  });

  function itHasStatus (status) {
    it('has status 404', function (done) {
      http.get(url, function (response) {
        expect(response.statusCode).to.equal(status);
        done();
      });
    });
  }

  function itHasContentTypeTextPlain () {
    it('has content type "text/plain"', function (done) {
      http.get(url, function (response) {
        expect(response.headers['content-type']).to.equal('text/plain');
        done();
      });
    });
  }

  function itRespondsWithBencodedData (data) {
    it(`responds with bencoded data "${data}"`, function (done) {
      http.get(url, function (response) {
        var text = '';

        response.on('data', function (chunk) {
          text += chunk;
        });
        response.on('end', function () {
          expect(text).to.equal(`encoded-${data}`);
          done();
        });
      });
    });
  }

  describe('GET /', function () {
    beforeEach(function () {
      url = `http://localhost:${PORT}`;
    });

    itHasStatus(404);
    itHasContentTypeTextPlain();
    itRespondsWithBencodedData('Not found')
  });

  describe('GET /announce', function () {
    beforeEach(function () {
      url = `http://localhost:${PORT}/announce`;
    });

    describe('when service worked properly', function () {
      beforeEach(function () {
        TrackerService.prototype.announce = function() {
          return 'announce-result';
        };
      });

      itHasStatus(200);
      itHasContentTypeTextPlain();
      itRespondsWithBencodedData('announce-result');
    });

    describe('when service throws an unhandled error', function () {
      beforeEach(function () {
        TrackerService.prototype.announce = function() {
          throw new Error('unhandled error message');
        };
      });

      itHasStatus(500);
      itHasContentTypeTextPlain();
      itRespondsWithBencodedData('unhandled error message');
    });
  });
});
