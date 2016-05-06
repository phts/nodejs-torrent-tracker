/// <reference path="../typings/main.d.ts" />
import * as _ from 'lodash';

export class TrackerService {
  private torrents: Object;

  constructor () {
    this.torrents = {};
  }

  announce (params) {
    var torrent = this.getTorrent(params.infoHash);
    torrent.peers[params.peerId] = {
      peerId: params.peerId,
      ip: params.ip,
      port: params.port
    };
    return {
      peers: _.values(this.torrents[params.infoHash].peers)
    };
  }

  private getTorrent(infoHash) {
    return this.torrents[infoHash] = this.torrents[infoHash] || {peers: {}};
  }
}
