'use strict';
var expect = require('chai').expect;
var sinon = require('sinon');
var createAnnounceParams = require('./helpers/create-announce-params');

describe('TrackerService', function () {
  var TrackerService = require('../release/tracker-service').default,
    MemoryTorrentStore = require('../release/memory-torrent-store').default,
    Torrent = require('../release/torrent').default,
    AnnounceParamsValidator = require('../release/announce-params-validator').default,
    Address = require('../release/address').default,
    bufferpack = require('bufferpack'),
    trackerService,
    torrentStub,
    memoryTorrentStoreStub,
    params,
    output,
    ip1 = [244, 200, 100, 44],
    ip2 = [192, 168, 0, 12],
    ip3 = [11, 22, 33, 66],
    port1 = 51413,
    port2 = 50000,
    port3 = 1,
    peer1 = {peerId: 'peer1', ip: new Address(ip1.join('.')), port: port1},
    peer2 = {peerId: 'peer2', ip: new Address(ip2.join('.')), port: port2},
    peer3 = {peerId: 'peer3', ip: new Address(ip3.join('.')), port: port3},
    peers = [peer1, peer2, peer3];

  beforeEach(function () {
    torrentStub = sinon.createStubInstance(Torrent);
    torrentStub.getPeers = function () {
      return peers;
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

    params = createAnnounceParams();
    trackerService = new TrackerService();
    trackerService.torrentStore = memoryTorrentStoreStub;
  });

  describe('#announce', function () {
    function returnsObject() {
      it('returns object', function () {
        expect(output).to.be.an('object');
      });
    }

    function returnsResponse(isCompact, noPeers) {
      returnsObject();

      describe('[peers]', function () {
        if (isCompact) {
          if (noPeers) {
            it("return an empty buffer", function() {
              expect(output.peers).to.be.an.instanceof(Buffer);
              expect(output.peers.length).to.equal(0);
            });
          } else {
            it('returns a buffer containing byte representations of IP address and port for each peer', function () {
              var addr1num = Buffer.from(ip1).readInt32BE(0),
                addr2num = Buffer.from(ip2).readInt32BE(0),
                addr3num = Buffer.from(ip3).readInt32BE(0),
                expected = bufferpack.pack('lHlHlH', [addr1num, port1, addr2num, port2, addr3num, port3]);
              expect(output.peers).to.eql(expected);
            });
          }

        } else {
          if (noPeers) {
            it('return an empty array', function () {
              expect(output.peers).to.eql([]);
            });
          } else {
            it('returns an array with peer objects', function () {
              expect(output.peers).to.eql([peer1, peer2, peer3]);
            });
          }
        }
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

      describe('[interval]', function () {
        it('contains an interval in seconds that the client should wait between sending regular requests to the tracker', function () {
          expect(output.interval).to.equal(300);
        });
      });
    }

    function returnsError(message) {
      returnsObject();

      describe('[failure reason]', function () {
        it('contains an error message', function () {
          expect(output['failure reason']).to.equal(message);
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

    function whenEventStopped(isCompact, noPeers) {
      describe("when `event` === stopped", function() {
        if (noPeers) {
          beforeEach(function () {
            torrentStub.getPeers = function () {
              return [];
            };
          });
        }

        beforeEach(function () {
          params
            .withCompact(isCompact)
            .withEvent('stopped');
          output = trackerService.announce(params);
        });

        returnsResponse(isCompact, noPeers);

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
    }

    function whenEventNotSpecified(isCompact, noPeers) {
      describe("when `event` is not specified", function () {
        if (noPeers) {
          beforeEach(function () {
            torrentStub.getPeers = function () {
              return [];
            };
          });
        }

        beforeEach(function () {
          params
            .withCompact(isCompact)
            .withEvent(undefined);
          output = trackerService.announce(params);
        });
        returnsResponse(isCompact, noPeers);
        behavesLikeEventNotSpecified();
      });
    }

    function whenEventStarted(isCompact, noPeers) {
      describe("when `event` === started", function () {
        if (noPeers) {
          beforeEach(function () {
            torrentStub.getPeers = function () {
              return [];
            };
          });
        }

        beforeEach(function () {
          params
            .withCompact(isCompact)
            .withEvent('started');
          output = trackerService.announce(params);
        });
        returnsResponse(isCompact, noPeers);
        behavesLikeEventNotSpecified();
      });
    }

    function whenEventCompleted(isCompact, noPeers) {
      describe("when `event` === completed", function () {
        if (noPeers) {
          beforeEach(function () {
            torrentStub.getPeers = function () {
              return [];
            };
          });
        }

        beforeEach(function () {
          params
            .withCompact(isCompact)
            .withEvent('completed');
          output = trackerService.announce(params);
        });
        returnsResponse(isCompact, noPeers);
        behavesLikeEventNotSpecified();
      });
    }

    beforeEach(function () {
      params
        .withPeerId('myPeerId')
        .withIp('11.22.33.44')
        .withPort(6666)
        .withLeft(27);
    });

    describe("when parameters are valid", function() {
      beforeEach(function () {
        sinon.stub(AnnounceParamsValidator.prototype, 'validate');
      });
      afterEach(function () {
        AnnounceParamsValidator.prototype.validate.restore();
      });

      describe('when a compact response is needed', function () {
        var isCompact = true;

        describe("when there is no peers", function() {
          var noPeers = true;
          whenEventStopped(isCompact, noPeers);
          whenEventNotSpecified(isCompact, noPeers);
          whenEventStarted(isCompact, noPeers);
          whenEventCompleted(isCompact, noPeers);
        });

        describe("when there are some peers", function() {
          var noPeers = false;
          whenEventStopped(isCompact, noPeers);
          whenEventNotSpecified(isCompact, noPeers);
          whenEventStarted(isCompact, noPeers);
          whenEventCompleted(isCompact, noPeers);
        });
      });

      describe('when a compact response is not needed', function () {
        var isCompact = false;

        describe("when there is no peers", function() {
          var noPeers = true;
          whenEventStopped(isCompact, noPeers);
          whenEventNotSpecified(isCompact, noPeers);
          whenEventStarted(isCompact, noPeers);
          whenEventCompleted(isCompact, noPeers);
        });

        describe("when there are some peers", function() {
          var noPeers = false;
          whenEventStopped(isCompact, noPeers);
          whenEventNotSpecified(isCompact, noPeers);
          whenEventStarted(isCompact, noPeers);
          whenEventCompleted(isCompact, noPeers);
        });
      });
    });

    describe("when parameters are not valid", function() {
      var message = 'my error message';
      beforeEach(function() {
        sinon.stub(AnnounceParamsValidator.prototype, 'validate', function() {
          throw new Error(message);
        });
        output = trackerService.announce(params);
      });
      afterEach(function () {
        AnnounceParamsValidator.prototype.validate.restore();
      });

      returnsError(message);
    });

  });
});
