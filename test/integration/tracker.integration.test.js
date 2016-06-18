'use strict';
var expect = require('chai').expect;
var http = require('http');
var bencode = require('bencode');

describe('Tracker', function () {
  const PORT = 8787;
  var Tracker = require('../../release/tracker').default,
    tracker,
    url;

  beforeEach(function () {
    tracker = new Tracker();
    tracker.start(PORT);
  });

  afterEach(function () {
    tracker.close();
  });

  describe('when send a correct announce `started` compact request', function () {
    beforeEach(function () {
      var query = [
        'info_hash=%f1%05%5b%b6%16%bb%c6%1a%23%b1%bcux%fe%e9%84%8dk%17M',
        'peer_id=-TR2840-%00%02%04%fe%f1%ffev0thq',
        'ip=200.150.100.50',
        'port=51413',
        'uploaded=0',
        'downloaded=0',
        'left=100',
        'numwant=80',
        'key=43508b98',
        'compact=1',
        'supportcrypto=1',
        'event=started'
      ];
      url = `http://localhost:${PORT}/announce?${query.join('&')}`;
    });

    it('registers this peer and returns a proper response', function (done) {
      http.get(url, function (response) {
        var text = Buffer.alloc(0);

        response.on('data', (chunk) => text = Buffer.concat([text, Buffer.from(chunk, 'binary')]));
        response.on('end', function () {
          var data = bencode.decode(text);
          expect(data.complete).to.equal(0);
          expect(data.incomplete).to.equal(1);
          expect(data.peers).to.not.be.undefined;
          done();
        });
      });
    });
  });

  describe('when send a correct announce `started` not-compact request', function () {
    var EXPECTED_PEER_ID = Buffer.from([
      '-'.charCodeAt(0),
      'T'.charCodeAt(0),
      'R'.charCodeAt(0),
      '2'.charCodeAt(0),
      '8'.charCodeAt(0),
      '4'.charCodeAt(0),
      '0'.charCodeAt(0),
      '-'.charCodeAt(0),
      0x00, 0x02, 0x04, 0xfe, 0xf1, 0xff, 0x10, 0x12, 0x14, 0x7e, 0x71, 0x7f]);

    beforeEach(function () {
      var query = [
        'info_hash=%f1%05%5b%b6%16%bb%c6%1a%23%b1%bcux%fe%e9%84%8dk%17M',
        'peer_id=-TR2840-%00%02%04%fe%f1%ff%10%12%14%7e%71%7f',
        'ip=200.150.100.50',
        'port=51413',
        'uploaded=0',
        'downloaded=0',
        'left=100',
        'numwant=80',
        'key=43508b98',
        'compact=0',
        'supportcrypto=1',
        'event=started'
      ];
      url = `http://localhost:${PORT}/announce?${query.join('&')}`;
    });

    it('registers this peer and returns a proper response', function (done) {
      http.get(url, function (response) {
        var text = Buffer.alloc(0);

        response.on('data', (chunk) => text = Buffer.concat([text, Buffer.from(chunk, 'binary')]));
        response.on('end', function () {
          var data = bencode.decode(text);
          expect(data.complete).to.equal(0);
          expect(data.incomplete).to.equal(1);
          expect(Object.keys(data.peers).length).to.equal(1);
          expect(data.peers[0].ip.toString()).to.equal('200.150.100.50');
          expect(data.peers[0]['peer id']).to.eql(EXPECTED_PEER_ID);
          expect(data.peers[0].port).to.equal(51413);
          done();
        });
      });
    });
  });
});
