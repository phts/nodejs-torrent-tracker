import AnnounceParams from './announce-params';
import Event from './event';

export default class AnnounceGetRequestParams implements AnnounceParams {
  infoHash: string;
  peerId: string;
  ip: string;
  port: number;
  left: number;
  event: Event;

  constructor(query, ip: string) {
    this.infoHash = query['info_hash'];
    this.peerId = query['peer_id'];
    this.ip = query['ip'] || ip;
    this.port = parseInt(query['port'], 10);
    this.left = parseInt(query['left'], 10);
    this.event = Event[String(query['event'])];
  }
}
