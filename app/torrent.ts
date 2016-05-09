import * as _ from 'lodash';
import Peer from './peer';

export default class Torrent {
  private infoHash: string;
  private peers: Object;

  constructor(infoHash) {
    this.infoHash = infoHash;
    this.peers = {};
  }

  getInfoHash() {
    return this.infoHash;
  }

  getPeers() {
    return _.values(this.peers);
  }

  setPeer(peer: Peer) {
    this.peers[peer.peerId] = peer;
  }
}
