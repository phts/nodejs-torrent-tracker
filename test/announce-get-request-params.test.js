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
      beforeEach(function () {
        rawParams.withInfoHash('someInfoHash');
        output = new AnnounceGetRequestParams(rawParams);
      });
      it('returns request\'s `info_hash` param as is', function () {
        expect(output.infoHash).to.equal('someInfoHash');
      });
    });

    describe('[peerId]', function () {
      beforeEach(function () {
        rawParams.withPeerId('somePeerId');
        output = new AnnounceGetRequestParams(rawParams);
      });
      it('returns request\'s `peer_id` param as is', function () {
        expect(output.peerId).to.equal('somePeerId');
      });
    });

    describe('[ip]', function () {
      beforeEach(function () {
        rawParams.withIp('someIp');
        output = new AnnounceGetRequestParams(rawParams);
      });
      it('returns request\'s `ip` param as is', function () {
        expect(output.ip).to.equal('someIp');
      });
    });

    describe('[port]', function () {
      beforeEach(function () {
        rawParams.withPort('4422');
        output = new AnnounceGetRequestParams(rawParams);
      });
      it('returns parsed number of request\'s `port` param', function () {
        expect(output.port).to.equal(4422);
      });
    });

    describe('[left]', function () {
      beforeEach(function () {
        rawParams.withLeft('42');
        output = new AnnounceGetRequestParams(rawParams);
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
            output = new AnnounceGetRequestParams(rawParams);
          });
          it('returns parsed event of request\'s `event` param', function () {
            expect(output.event).to.equal(Event[eventValue]);
          });
        });
      });

      describe('if it has invalid value', function () {
        beforeEach(function () {
          rawParams.withEvent('invalid');
          output = new AnnounceGetRequestParams(rawParams);
        });
        it('returns undefined event', function () {
          expect(output.event).to.be.undefined;
        });
      });
      describe('if it is missing', function () {
        beforeEach(function () {
          rawParams.withoutEvent();
          output = new AnnounceGetRequestParams(rawParams);
        });
        it('returns undefined event', function () {
          expect(output.event).to.be.undefined;
        });
      });
    });
  });
});
