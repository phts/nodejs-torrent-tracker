import Torrent from './torrent';
import Peer from './peer';

interface TorrentStore {
  getTorrent(infoHash: Buffer): Torrent;
  saveTorrent(torrent: Torrent): void;
}

export default TorrentStore;
