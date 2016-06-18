import * as _ from 'lodash';
import Peer from './peer';
import BufferKeyedMap from './buffer-keyed-map';

export default class Torrent {
  private infoHash: Buffer;
  private peers: BufferKeyedMap<Peer>;

  constructor(infoHash: Buffer) {
    this.infoHash = infoHash;
    this.peers = new BufferKeyedMap<Peer>();
  }

  getInfoHash(): Buffer {
    return this.infoHash;
  }

  getPeers(): Peer[] {
    return this.peers.getValues();
  }

  setPeer(peer: Peer) {
    this.peers.set(peer.peerId, peer);
  }

  getComplete() {
    return _.filter(this.peers.getData(), x => x.left === 0).length;
  }

  getIncomplete() {
    return _.reject(this.peers.getData(), x => x.left === 0).length;
  }

  removePeer(peerId: Buffer) {
    this.peers.delete(peerId);
  }
}
