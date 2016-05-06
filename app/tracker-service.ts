/// <reference path="../typings/main.d.ts" />
import TorrentStore from './torrent-store';
import MemoryTorrentStore from './memory-torrent-store';

export class TrackerService {
  private torrentStore: TorrentStore;

  constructor () {
    this.torrentStore = new MemoryTorrentStore();
  }

  announce (params) {
    this.torrentStore.savePeer(params.infoHash, {
      peerId: params.peerId,
      ip: params.ip,
      port: params.port
    });
    return {
      peers: this.torrentStore.getPeers(params.infoHash)
    };
  }
}
