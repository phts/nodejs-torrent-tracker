'use strict';
var expect = require('chai').expect;
var sinon = require('sinon');
var createRequestParams = require('./helpers/create-request-params');

describe('TrackerService', function () {
  var TrackerService = require('../release/tracker-service').default,
    MemoryTorrentStore = require('../release/memory-torrent-store').default,
    Torrent = require('../release/torrent').default,
    trackerService,
    torrentStub,
    memoryTorrentStoreStub,
    params,
    output;

  beforeEach(function () {
    torrentStub = sinon.createStubInstance(Torrent);
    torrentStub.getPeers = function () {
      return 'peers';
    };
    torrentStub.getComplete = function () {
      return 'complete';
    };
    torrentStub.getIncomplete = function () {
      return 'incomplete';
    };

    memoryTorrentStoreStub = sinon.createStubInstance(MemoryTorrentStore);
    memoryTorrentStoreStub.getTorrent = function () {
      return torrentStub;
    };

    params = createRequestParams();
    trackerService = new TrackerService();
    trackerService.torrentStore = memoryTorrentStoreStub;
  });

  describe('#announce', function () {
    function returnsObject() {
      it('returns object', function () {
        expect(output).to.be.an('object');
      });

      describe('[peers]', function () {
        it('contains a list of peers', function () {
          expect(output.peers).to.equal('peers');
        });
      });

      describe('[complete]', function () {
        it('contains a list of seeders', function () {
          expect(output.complete).to.equal('complete');
        });
      });

      describe('[incomplete]', function () {
        it('contains a list of leechers', function () {
          expect(output.incomplete).to.equal('incomplete');
        });
      });
    }

    function behavesLikeEventNotSpecified() {
      it('sets peer\'s data only once', function () {
        expect(torrentStub.setPeer.callCount).to.equal(1);
      });

      ['peerId', 'ip', 'port', 'left'].forEach(function (testParam) {
        it('updates the peer\'s ' + testParam, function () {
          var expObj = {};
          expObj[testParam] = params[testParam];
          expect(torrentStub.setPeer.getCall(0).args[0]).to.include(expObj);
        });
      });

      it('saves updated torrent', function () {
        expect(memoryTorrentStoreStub.saveTorrent.callCount).to.equal(1);
        expect(memoryTorrentStoreStub.saveTorrent.calledAfter(torrentStub.setPeer)).to.be.true;
        expect(memoryTorrentStoreStub.saveTorrent.calledWith(torrentStub)).to.be.true;
      });
    }

    beforeEach(function () {
      params
        .withPeerId('myPeerId')
        .withIp('11.22.33.44')
        .withPort(6666)
        .withLeft(27);
    });

    describe("when `event` === stopped", function() {
      beforeEach(function () {
        params.withEvent('stopped');
        output = trackerService.announce(params);
      });

      returnsObject();

      it('unregisters the peer from the torrent', function () {
        expect(torrentStub.removePeer.callCount).to.equal(1);
        expect(torrentStub.removePeer.calledWith('myPeerId')).to.be.true;
      });

      it('saves updated torrent', function () {
        expect(memoryTorrentStoreStub.saveTorrent.callCount).to.equal(1);
        expect(memoryTorrentStoreStub.saveTorrent.calledAfter(torrentStub.removePeer)).to.be.true;
        expect(memoryTorrentStoreStub.saveTorrent.calledWith(torrentStub)).to.be.true;
      });
    });

    describe("when `event` is not specified", function () {
      beforeEach(function () {
        params.withEvent(undefined);
        output = trackerService.announce(params);
      });
      returnsObject();
      behavesLikeEventNotSpecified();
    });

    describe("when `event` === started", function () {
      beforeEach(function () {
        params.withEvent('started');
        output = trackerService.announce(params);
      });
      returnsObject();
      behavesLikeEventNotSpecified();
    });

    describe("when `event` === completed", function () {
      beforeEach(function () {
        params.withEvent('completed');
        output = trackerService.announce(params);
      });
      returnsObject();
      behavesLikeEventNotSpecified();
    });
  });
});
