"use strict";
var _ = require('lodash');
var Torrent = (function () {
    function Torrent(infoHash) {
        this.infoHash = infoHash;
        this.peers = {};
    }
    Torrent.prototype.getInfoHash = function () {
        return this.infoHash;
    };
    Torrent.prototype.getPeers = function () {
        return _.values(this.peers);
    };
    Torrent.prototype.setPeer = function (peer) {
        this.peers[peer.peerId] = peer;
    };
    Torrent.prototype.getComplete = function () {
        return _.filter(this.getPeers(), function (x) { return x.left === 0; }).length;
    };
    Torrent.prototype.getIncomplete = function () {
        return _.reject(this.getPeers(), function (x) { return x.left === 0; }).length;
    };
    Torrent.prototype.removePeer = function (peerId) {
        delete this.peers[peerId];
    };
    return Torrent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Torrent;
