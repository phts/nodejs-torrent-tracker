import TorrentStore from './torrent-store';
import Torrent from './torrent';
import BufferKeyedMap from './buffer-keyed-map';

export default class MemoryTorrentStore implements TorrentStore {
  private torrents: BufferKeyedMap<Torrent>;

  constructor() {
    this.torrents = new BufferKeyedMap<Torrent>();
  }

  getTorrent(infoHash: Buffer) {
    return this.torrents.get(infoHash) || new Torrent(infoHash);
  }

  saveTorrent(torrent: Torrent) {
    this.torrents.set(torrent.getInfoHash(), torrent);
  }
}
