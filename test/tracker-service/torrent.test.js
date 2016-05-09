'use strict';
var expect = require('chai').expect;

describe('Torrent', function () {
  var Torrent = require('../../release/torrent').default,
    torrent,
    result;

  describe('#getInfoHash', function () {
    var infoHash = 'expectedInfoHash';
    beforeEach(function () {
      torrent = new Torrent(infoHash);
      result = torrent.getInfoHash();
    });

    it('returns infoHash value associated with this torrent', function () {
      expect(result).to.equal(infoHash);
    });
  });

  describe('#getPeers', function () {
    beforeEach(function () {
      torrent = new Torrent('infohash');
    });
    describe('when this torrent has no peers', function () {
      beforeEach(function () {
        torrent.peers = {};
        result = torrent.getPeers();
      });

      it('return an empty array', function () {
        expect(result).to.eql([]);
      });
    });
    describe('when this torrent has some peers', function () {
      beforeEach(function () {
        torrent.peers = {
          peer1: {peerProp1: 'peerValue1'},
          peer2: {peerProp2: 'peerValue2'},
          peer3: {peerProp3: 'peerValue3'}
        };
        result = torrent.getPeers();
      });
      it('returns an array with peer objects', function () {
        expect(result).to.eql([
          {peerProp1: 'peerValue1'},
          {peerProp2: 'peerValue2'},
          {peerProp3: 'peerValue3'}
        ]);
      });
    });
  });

  describe('#setPeer', function () {
    beforeEach(function () {
      torrent = new Torrent('infohash');
    });

    describe('when this peer not registered before', function () {
      var peer = {
          peerId: 'peerId',
          peerProps: 'peerValues'
        };
      beforeEach(function () {
        torrent.setPeer(peer);
      });

      it('adds it to the store', function () {
        expect(torrent.getPeers()).to.contain(peer);
      });
    });

    describe('when this peer was registered before', function () {
      var oldPeer = {
          peerId: 'peerId',
          oldPeerValues: 'oldPeerValues'
        },
        newPeer = {
          peerId: 'peerId',
          newPeerValues: 'newPeerValues'
        };
      beforeEach(function () {
        torrent.setPeer(oldPeer);
        torrent.setPeer(newPeer);
      });

      it('updates its data', function () {
        expect(torrent.getPeers()).to.contain(newPeer);
      });
    });
  });

  describe("#getComplete", function() {
    beforeEach(function () {
      torrent = new Torrent('infohash');
    });

    describe("when torrent has no peers", function() {
      beforeEach(function() {
        result = torrent.getComplete();
      });

      it("returns zero", function() {
        expect(result).to.equal(0);
      });
    });

    describe("when torrent have some registered peers", function() {
      beforeEach(function () {
        torrent.setPeer({peerId: 'leecher1', left: 10});
        torrent.setPeer({peerId: 'seeder1', left: 0});
        torrent.setPeer({peerId: 'leecher2', left: 20});
        torrent.setPeer({peerId: 'seeder2', left: 0});
        torrent.setPeer({peerId: 'leecher3', left: 30});
        result = torrent.getComplete();
      });

      it("returns an amount of seeders", function() {
        expect(result).to.equal(2);
      });
    });
  });

  describe("#getIncomplete", function() {
    beforeEach(function () {
      torrent = new Torrent('infohash');
    });

    describe("when torrent has no peers", function() {
      beforeEach(function() {
        result = torrent.getIncomplete();
      });

      it("returns zero", function() {
        expect(result).to.equal(0);
      });
    });

    describe("when torrent have some registered peers", function() {
      beforeEach(function () {
        torrent.setPeer({peerId: 'leecher1', left: 10});
        torrent.setPeer({peerId: 'seeder1', left: 0});
        torrent.setPeer({peerId: 'leecher2', left: 20});
        torrent.setPeer({peerId: 'seeder2', left: 0});
        torrent.setPeer({peerId: 'leecher3', left: 30});
        result = torrent.getIncomplete();
      });

      it("returns an amount of leecher", function() {
        expect(result).to.equal(3);
      });
    });
  });
});
