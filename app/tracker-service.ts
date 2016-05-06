/// <reference path="../typings/main.d.ts" />
var _ = require('lodash/core');

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
