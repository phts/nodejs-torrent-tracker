'use strict';
var expect = require('chai').expect;
var sinon = require('sinon');
var http = require('http');

describe('Tracker', function () {
  const PORT = 8787;
  var Tracker = require('../release/tracker').default,
    TrackerService = require('../release/tracker-service').default,
    bencode = require('bencode'),
    tracker,
    url;

  before(function () {
    sinon.stub(bencode, 'encode', function (data) {
      return 'encoded-'+data;
    });
  });
  after(function () {
    bencode.encode.restore();
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
        sinon.stub(TrackerService.prototype, 'announce', function() {
          return 'announce-result';
        });
      });

      afterEach(function () {
        TrackerService.prototype.announce.restore();
      });

      itHasStatus(200);
      itHasContentTypeTextPlain();
      itRespondsWithBencodedData('announce-result');
    });

    describe('when service throws an unhandled error', function () {
      beforeEach(function () {
        sinon.stub(TrackerService.prototype, 'announce', function() {
          throw new Error('unhandled error message');
        });
      });

      afterEach(function () {
        TrackerService.prototype.announce.restore();
      });

      itHasStatus(500);
      itHasContentTypeTextPlain();
      itRespondsWithBencodedData('unhandled error message');
    });
  });
});
