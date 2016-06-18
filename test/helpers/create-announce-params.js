var Event = require('../../release/event').default;

function createAnnounceParams () {
  return {
    infoHash: '12345678901234567890',
    peerId: 'MockPeer',
    port: 8788,
    uploaded: 11,
    downloaded: 22,
    left: 33,

    without: function (param) {
      delete this[param];
      return this;
    },
    withInfoHash: function (infoHash) {
      this.infoHash = infoHash;
      return this;
    },
    withPeerId: function (peerId) {
      this.peerId = peerId;
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
      this.event = Event[event];
      return this;
    },
    withCompact: function (isCompact) {
      this.isCompact = isCompact;
      return this;
    }
  };
}

module.exports = createAnnounceParams;
