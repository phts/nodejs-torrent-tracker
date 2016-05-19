import Event from '../../app/event';

(function() {
  function createRequestParams () {
    return {
      infoHash: '12345678901234567890',
      peerId: 'MockPeer',
      port: 8788,
      uploaded: 11,
      downloaded: 22,
      left: 33,

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
      }
    };
  }

  module.exports = createRequestParams;
})();
