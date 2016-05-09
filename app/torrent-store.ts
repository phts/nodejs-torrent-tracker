import Torrent from './torrent';
import Peer from './peer';

interface TorrentStore {
  getTorrent(infoHash: string): Torrent;
  saveTorrent(torrent: Torrent): void;
}

export default TorrentStore;
