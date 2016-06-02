import Address from './address';

interface Peer {
  peerId: string;
  ip: Address;
  port: number;
  left: number;
}

export default Peer;
