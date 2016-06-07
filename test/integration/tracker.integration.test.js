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

  describe('when send a correct announce `started` request', function () {
    beforeEach(function () {
      var query = [
        'info_hash=%f1%05%5b%b6%16%bb%c6%1a%23%b1%bcux%fe%e9%84%8dk%17M',
        'peer_id=-TR2840-xs32fiev0thq',
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
          expect(data.complete).to.not.be.undefined;
          expect(data.incomplete).to.not.be.undefined;
          expect(data.peers).to.not.be.undefined;
          done();
        });
      });
    });
  });
});
