/// <reference path="../typings/main.d.ts" />
import AnnounceParams from './announce-params';
import TorrentStore from './torrent-store';
import MemoryTorrentStore from './memory-torrent-store';
import Torrent from './torrent';
import Event from './event';

export class TrackerService {
  private torrentStore: TorrentStore;

  constructor () {
    this.torrentStore = new MemoryTorrentStore();
  }

  announce (params: AnnounceParams) {
    var torrent = this.torrentStore.getTorrent(params.infoHash);
    this._processEvent(params, torrent);
    return {
      complete: torrent.getComplete(),
      incomplete: torrent.getIncomplete(),
      peers: torrent.getPeers(),
    };
  }

  private _processEvent(params: AnnounceParams, torrent: Torrent) {
    if (params.event === Event.stopped) {
      torrent.removePeer(params.peerId);
    } else {
      torrent.setPeer({
        peerId: params.peerId,
        ip: params.ip,
        port: params.port,
        left: params.left,
      });
    }
    this.torrentStore.saveTorrent(torrent);
  }
}
