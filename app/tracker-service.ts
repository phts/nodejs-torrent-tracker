/// <reference path="../typings/main.d.ts" />
import AnnounceParams from './announce-params';
import TorrentStore from './torrent-store';
import MemoryTorrentStore from './memory-torrent-store';
import Torrent from './torrent';

export class TrackerService {
  private torrentStore: TorrentStore;

  constructor () {
    this.torrentStore = new MemoryTorrentStore();
  }

  announce (params) {
    var torrent = this.torrentStore.getTorrent(params.infoHash);
    torrent.setPeer({
      peerId: params.peerId,
      ip: params.ip,
      port: params.port
    });

    this.torrentStore.saveTorrent(torrent);
    return {
      peers: torrent.getPeers()
    };
  }
}
