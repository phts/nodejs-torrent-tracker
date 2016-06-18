import Address from './address';

interface Peer {
  peerId: Buffer;
  ip: Address;
  port: number;
  left: number;
}

export default Peer;
