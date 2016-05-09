import TorrentStore from './torrent-store';
import Torrent from './torrent';

export default class MemoryTorrentStore implements TorrentStore {
  private torrents: Object;

  constructor() {
    this.torrents = {};
  }

  getTorrent(infoHash: string) {
    return this.torrents[infoHash] || new Torrent(infoHash);
  }

  saveTorrent(torrent: Torrent) {
    this.torrents[torrent.getInfoHash()] = torrent;
  }
}
