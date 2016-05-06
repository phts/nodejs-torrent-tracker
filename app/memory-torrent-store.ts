import * as _ from 'lodash';
import TorrentStore from './torrent-store';
import Torrent from './torrent';
import Peer from './peer';

export default class MemoryTorrentStore implements TorrentStore {
  private torrents: Object;

  constructor() {
    this.torrents = {};
  }

  getTorrent(infoHash: string) {
    return this.torrents[infoHash] = this.torrents[infoHash] || {peers: {}};
  }

  getPeers(infoHash: string) {
    return <Peer[]> _.values(this.getTorrent(infoHash).peers);
  }

  savePeer(infoHash: string, peer: Peer) {
    this.getTorrent(infoHash).peers[peer.peerId] = peer;
  }
}
