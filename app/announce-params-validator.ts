import * as _ from 'lodash';
import AnnounceParams from './announce-params';

export default class AnnounceParamsValidator {
  private params: AnnounceParams;

  constructor(params) {
    this.params = params;
  }

  validate() {
    if (_.isNil(this.params.infoHash)) {
      throw new Error('Info hash parameter is missing');
    }
    if (Buffer.byteLength(this.params.infoHash) !== 20) {
      throw new Error('Info hash parameter is invalid');
    }
    if (_.isNil(this.params.peerId)) {
      throw new Error('Peer id parameter is missing');
    }
    if (Buffer.byteLength(this.params.peerId) !== 20) {
      throw new Error('Peer id parameter is invalid');
    }
  }
}
