"use strict";
var torrent_1 = require('./torrent');
var MemoryTorrentStore = (function () {
    function MemoryTorrentStore() {
        this.torrents = {};
    }
    MemoryTorrentStore.prototype.getTorrent = function (infoHash) {
        return this.torrents[infoHash] || new torrent_1.default(infoHash);
    };
    MemoryTorrentStore.prototype.saveTorrent = function (torrent) {
        this.torrents[torrent.getInfoHash()] = torrent;
    };
    return MemoryTorrentStore;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoryTorrentStore;
