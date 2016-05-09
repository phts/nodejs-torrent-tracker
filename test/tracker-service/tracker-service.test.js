'use strict';
var expect = require('chai').expect;
var sinon = require('sinon');
var createRequestParams = require('../helpers/create-request-params');

describe('TrackerService', function () {
  var TrackerService = require('../../release/tracker-service').TrackerService,
    MemoryTorrentStore = require('../../release/memory-torrent-store').default,
    Torrent = require('../../release/torrent').default,
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

    memoryTorrentStoreStub = sinon.createStubInstance(MemoryTorrentStore);
    memoryTorrentStoreStub.getTorrent = function () {
      return torrentStub;
    };

    params = createRequestParams();
    trackerService = new TrackerService();
    trackerService.torrentStore = memoryTorrentStoreStub;
  });

  describe('#announce', function () {
    beforeEach(function () {
      params
        .withPeerId('myPeerId')
        .withIp('11.22.33.44')
        .withPort(6666);
      output = trackerService.announce(params);
    });

    it('sets peer\'s data only once', function () {
      expect(torrentStub.setPeer.callCount).to.equal(1);
    });

    it('updates the peer\'s id', function () {
      expect(torrentStub.setPeer.getCall(0).args[0]).to.include({peerId: 'myPeerId'});
    });

    it('updates the peer\'s ip', function () {
      expect(torrentStub.setPeer.getCall(0).args[0]).to.include({ip: '11.22.33.44'});
    });

    it('updates the peer\'s port', function () {
      expect(torrentStub.setPeer.getCall(0).args[0]).to.include({port: 6666});
    });

    it('saves updated torrent', function () {
      expect(memoryTorrentStoreStub.saveTorrent.callCount).to.equal(1);
      expect(memoryTorrentStoreStub.saveTorrent.calledAfter(torrentStub.setPeer)).to.be.true;
      expect(memoryTorrentStoreStub.saveTorrent.calledWith(torrentStub)).to.be.true;
    });

    describe('[peers]', function () {
      it('contains a list of peers', function () {
        expect(output.peers).to.equal('peers');
      });
    });
  });
});
