import Event from './event';

interface AnnounceParams {
  infoHash: string;
  peerId: string;
  ip: string;
  port: number;
  left: number;
  event?: Event;
}

export default AnnounceParams;
