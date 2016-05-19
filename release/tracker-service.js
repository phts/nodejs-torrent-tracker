"use strict";
var memory_torrent_store_1 = require('./memory-torrent-store');
var event_1 = require('./event');
var TrackerService = (function () {
    function TrackerService() {
        this.torrentStore = new memory_torrent_store_1.default();
    }
    TrackerService.prototype.announce = function (params) {
        var torrent = this.torrentStore.getTorrent(params.infoHash);
        this._processEvent(params, torrent);
        return {
            complete: torrent.getComplete(),
            incomplete: torrent.getIncomplete(),
            peers: torrent.getPeers(),
        };
    };
    TrackerService.prototype._processEvent = function (params, torrent) {
        if (params.event === event_1.default.stopped) {
            torrent.removePeer(params.peerId);
        }
        else {
            torrent.setPeer({
                peerId: params.peerId,
                ip: params.ip,
                port: params.port,
                left: params.left,
            });
        }
        this.torrentStore.saveTorrent(torrent);
    };
    return TrackerService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TrackerService;
