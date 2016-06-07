import * as _ from 'lodash';
import Peer from './peer';
import * as bufferpack from 'bufferpack';

export default class Torrent {
  private infoHash: string;
  private peers: {
    [peerId: string]: Peer
  };

  constructor(infoHash: string) {
    this.infoHash = infoHash;
    this.peers = {};
  }

  getInfoHash() {
    return this.infoHash;
  }

  getPeers(isCompact?: boolean): Peer[]|Buffer {
    if (isCompact) {
      return <Buffer> bufferpack.pack(_.repeat('lH', _.size(this.peers)),
        _(this.peers)
          .values()
          .map((x: Peer) => [x.ip.toNumber(), x.port])
          .flatten()
          .value());
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
