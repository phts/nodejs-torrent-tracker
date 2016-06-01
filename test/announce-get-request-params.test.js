'use strict';
var expect = require('chai').expect;
var AnnounceGetRequestParams = require('../release/announce-get-request-params').default;
var createGetRequestParams = require('./helpers/create-get-request-params');
var Event = require('../release/event').default;

describe('AnnounceGetRequestParams', function() {
  var output, rawParams;

  describe('#new', function() {
    beforeEach(function () {
      rawParams = createGetRequestParams();
    });

    describe('[infoHash]', function () {
      var EXPECTED = Buffer.from([
        0xf1,
        0x05,
        0x5b,
        0xb6,
        0x16,
        0xbb,
        0xc6,
        0x1a,
        0x23,
        0xb1,
        0xbc,
        'u'.charCodeAt(0),
        'x'.charCodeAt(0),
        0xfe,
        0xe9,
        0x84,
        0x8d,
        'k'.charCodeAt(0),
        0x17,
        'M'.charCodeAt(0)
      ]).toString('binary');
      beforeEach(function () {
        rawParams.withInfoHash('%f1%05%5b%b6%16%bb%c6%1a%23%b1%bcux%fe%e9%84%8dk%17M');
        output = new AnnounceGetRequestParams(rawParams.toQuery());
      });

      it('returns a binary string decoded from the query', function () {
        expect(output.infoHash).to.eql(EXPECTED);
      });
    });

    describe('[peerId]', function () {
      var EXPECTED = Buffer.from([
        '-'.charCodeAt(0),
        'T'.charCodeAt(0),
        'R'.charCodeAt(0),
        '2'.charCodeAt(0),
        '8'.charCodeAt(0),
        '4'.charCodeAt(0),
        '0'.charCodeAt(0),
        '-'.charCodeAt(0),
        'x'.charCodeAt(0),
        's'.charCodeAt(0),
        '3'.charCodeAt(0),
        '2'.charCodeAt(0),
        'f'.charCodeAt(0),
        'i'.charCodeAt(0),
        'e'.charCodeAt(0),
        'v'.charCodeAt(0),
        '0'.charCodeAt(0),
        't'.charCodeAt(0),
        'h'.charCodeAt(0),
        'q'.charCodeAt(0)
      ]).toString('binary');
      beforeEach(function () {
        rawParams.withPeerId('-TR2840-xs32fiev0thq');
        output = new AnnounceGetRequestParams(rawParams.toQuery());
      });

      it('returns a binary string decoded from the query', function () {
        expect(output.peerId).to.eql(EXPECTED);
      });
    });

    describe('[ip]', function () {
      describe("when the request doesn't contain `ip` param", function() {
        beforeEach(function () {
          rawParams.without('ip');
          output = new AnnounceGetRequestParams(rawParams.toQuery(), 'givenIp');
        });
        it("returns a value given in the constructor", function() {
          expect(output.ip).to.equal('givenIp');
        });
      });
      describe("when the request contains `ip` param", function() {
        beforeEach(function () {
          rawParams.withIp('someIp');
          output = new AnnounceGetRequestParams(rawParams.toQuery());
        });
        it('returns request\'s `ip` param as is', function () {
          expect(output.ip).to.equal('someIp');
        });
      });
    });

    describe('[port]', function () {
      beforeEach(function () {
        rawParams.withPort('4422');
        output = new AnnounceGetRequestParams(rawParams.toQuery());
      });
      it('returns parsed number of request\'s `port` param', function () {
        expect(output.port).to.equal(4422);
      });
    });

    describe('[left]', function () {
      beforeEach(function () {
        rawParams.withLeft('42');
        output = new AnnounceGetRequestParams(rawParams.toQuery());
      });
      it('returns parsed number of request\'s `left` param', function () {
        expect(output.left).to.equal(42);
      });
    });

    describe('[event]', function () {
      ['started', 'stopped', 'completed'].forEach(function (eventValue) {
        describe(`if it has \`${eventValue}\` value`, function () {
          beforeEach(function () {
            rawParams.withEvent(eventValue);
            output = new AnnounceGetRequestParams(rawParams.toQuery());
          });
          it('returns parsed event of request\'s `event` param', function () {
            expect(output.event).to.equal(Event[eventValue]);
          });
        });
      });

      describe('if it has invalid value', function () {
        beforeEach(function () {
          rawParams.withEvent('invalid');
          output = new AnnounceGetRequestParams(rawParams.toQuery());
        });
        it('returns undefined event', function () {
          expect(output.event).to.be.undefined;
        });
      });
      describe('if it is missing', function () {
        beforeEach(function () {
          rawParams.without('event');
          output = new AnnounceGetRequestParams(rawParams.toQuery());
        });
        it('returns undefined event', function () {
          expect(output.event).to.be.undefined;
        });
      });
    });
  });
});
