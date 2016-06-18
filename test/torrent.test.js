'use strict';
var expect = require('chai').expect;

describe('Torrent', function () {
  var Torrent = require('../release/torrent').default,
    infoHash = Buffer.from([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]).toString('binary'),
    torrent,
    result;

  describe('#getInfoHash', function () {
    beforeEach(function () {
      torrent = new Torrent(infoHash);
      result = torrent.getInfoHash();
    });

    it('returns infoHash value associated with this torrent', function () {
      expect(result).to.equal(infoHash);
    });
  });

  describe('#getPeers', function () {
    var peer1 = {peerId: 'peer1', peerProp1: 'peerValue1'},
      peer2 = {peerId: 'peer2', peerProp2: 'peerValue2'},
      peer3 = {peerId: 'peer3', peerProp3: 'peerValue3'};

    beforeEach(function () {
      torrent = new Torrent(infoHash);
      torrent.setPeer(peer1);
      torrent.setPeer(peer2);
      torrent.setPeer(peer3);
      result = torrent.getPeers();
    });

    it('returns an array of peer objects', function() {
      expect(result).to.eql([peer1, peer2, peer3]);
    });
  });

  describe('#setPeer', function () {
    var peerId = 'peerId1';

    beforeEach(function () {
      torrent = new Torrent('infohash');
    });

    describe('when this peer not registered before', function () {
      var peer = {
          peerId: peerId,
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
          peerId: peerId,
          oldPeerValues: 'oldPeerValues'
        },
        newPeer = {
          peerId: peerId,
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
      torrent = new Torrent(infoHash);
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
      torrent = new Torrent(infoHash);
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

  describe('#removePeer', function () {
    beforeEach(function () {
      torrent = new Torrent(infoHash);
    });
    describe('when the specified peer is not registered for the torrent', function () {
      beforeEach(function () {
        torrent.setPeer({peerId: 'regPeer', peerProps: 'peerProps'})
        torrent.removePeer('notFoundPeer');
      });

      it('does nothing', function () {
        expect(torrent.getPeers()).to.eql([{peerId: 'regPeer', peerProps: 'peerProps'}]);
      });
    });
    describe('when the specified peer is registered for the torrent', function () {
      beforeEach(function () {
        torrent.setPeer({peerId: 'regPeer1', peer1Props: 'peer1Props'})
        torrent.setPeer({peerId: 'regPeer2', peer2Props: 'peer2Props'})
        torrent.removePeer('regPeer1');
      });

      it('unregisters the peer from the torrent', function () {
        expect(torrent.getPeers()).to.eql([{peerId: 'regPeer2', peer2Props: 'peer2Props'}]);
      });
    });
  });
});
