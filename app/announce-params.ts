import Event from './event';
import Address from './address';

interface AnnounceParams {
  infoHash: Buffer;
  peerId: Buffer;
  ip: Address;
  port: number;
  left: number;
  event?: Event;
  isCompact?: boolean;
}

export default AnnounceParams;
