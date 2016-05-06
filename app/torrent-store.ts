import Torrent from './torrent';
import Peer from './peer';

interface TorrentStore {
  getTorrent(infoHash: string): Torrent;
  getPeers(infoHash: string): Peer[];
  savePeer(infoHash: string, peer: Peer): void;
}

export default TorrentStore;
