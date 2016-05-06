/// <reference path="../typings/main.d.ts" />
import * as _ from 'lodash';

export class TrackerService {
  private peers: Object;

  constructor () {
    this.peers = {};
  }

  announce (params) {
    this.peers[params.peerId] = {
      peerId: params.peerId,
      ip: params.ip,
      port: params.port
    };
    return {
      peers: _.values(this.peers)
    };
  }
}
