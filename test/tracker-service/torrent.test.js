'use strict';
var expect = require('chai').expect;

describe('Torrent', function () {
  var Torrent = require('../../release/torrent').default,
    torrent;

  describe('#getInfoHash', function () {
    var infoHash = 'expectedInfoHash';
    beforeEach(function () {
      torrent = new Torrent(infoHash);
    });

    it('returns infoHash value associated with this torrent', function () {
      expect(torrent.getInfoHash()).to.equal(infoHash);
    });
  });

  describe('#getPeers', function () {
    beforeEach(function () {
      torrent = new Torrent('infohash');
    });
    describe('when this torrent has no peers', function () {
      beforeEach(function () {
        torrent.peers = {};
      });

      it('return an empty array', function () {
        expect(torrent.getPeers()).to.eql([]);
      });
    });
    describe('when this torrent has some peers', function () {
      beforeEach(function () {
        torrent.peers = {
          peer1: {peerProp1: 'peerValue1'},
          peer2: {peerProp2: 'peerValue2'},
          peer3: {peerProp3: 'peerValue3'}
        };
      });
      it('returns an array with peer objects', function () {
        expect(torrent.getPeers()).to.eql([
          {peerProp1: 'peerValue1'},
          {peerProp2: 'peerValue2'},
          {peerProp3: 'peerValue3'}
        ]);
      });
    });
  });

  describe('setPeer', function () {
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
});
