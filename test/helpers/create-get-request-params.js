var qs = require('qs');

function createGetRequestParams () {
  return {
    withInfoHash: function (info_hash) {
      this.info_hash = info_hash;
      return this;
    },
    withPeerId: function (peer_id) {
      this.peer_id = peer_id;
      return this;
    },
    withIp: function (ip) {
      this.ip = ip;
      return this;
    },
    withPort: function (port) {
      this.port = port;
      return this;
    },
    withLeft: function (left) {
      this.left = left;
      return this;
    },
    withEvent: function (event) {
      this.event = event;
      return this;
    },
    without: function (param) {
      delete this[param];
      return this;
    },
    toQuery: function () {
      return qs.stringify(this, {encode: false});
    }
  };
}

module.exports = createGetRequestParams;
