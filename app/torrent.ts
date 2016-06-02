import * as _ from 'lodash';
import Peer from './peer';
import * as bufferpack from 'bufferpack';

export default class Torrent {
  private infoHash: string;
  private peers: Object;

  constructor(infoHash: string) {
    this.infoHash = infoHash;
    this.peers = {};
  }

  getInfoHash() {
    return this.infoHash;
  }

  getPeers(isCompact?: boolean): Peer[]|string {
    if (isCompact) {
      return _(this.peers)
        .values()
        .map((x: Peer) => bufferpack.pack('!lh', [x.ip.toNumber(), x.port]))
        .join('');
    } else {
      return <Peer[]> _.values(this.peers);
    }
  }

  setPeer(peer: Peer) {
    this.peers[peer.peerId] = peer;
  }

  getComplete() {
    return _.filter(<Peer[]>this.getPeers(), x => x.left === 0).length;
  }

  getIncomplete() {
    return _.reject(<Peer[]>this.getPeers(), x => x.left === 0).length;
  }

  removePeer(peerId: string) {
    delete this.peers[peerId];
  }
}
