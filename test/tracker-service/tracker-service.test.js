'use strict';
var expect = require('chai').expect;
var createRequestParams = require('../helpers/create-request-params');

describe('TrackerService', function () {
  var TrackerService = require('../../release/tracker-service').TrackerService,
    trackerService,
    output,
    params;

  beforeEach(function () {
    params = createRequestParams();
    trackerService = new TrackerService();
  });

  describe('#announce', function () {
    describe('when action succeeded', function () {
      describe('when request doesn\'t contain `event` key', function () {
        describe('[peers]', function () {
          var peers;

          beforeEach(function () {
            params = params
              .withPeerId('myPeerId')
              .withIp('11.22.33.44')
              .withPort(6666);
            output = trackerService.announce(params);
            peers = output.peers;
          });

          it('is an array', function () {
            expect(peers).to.be.an('array');
          });

          it('contains updated data from the request', function () {
            expect(peers).to.contain({peerId: 'myPeerId', ip: '11.22.33.44', port: 6666});
          });

          describe('when other peers are registered before', function () {
            var manyPeers, otherPeerParams;
            beforeEach(function () {
              otherPeerParams = createRequestParams()
                .withPeerId('newPeerId')
                .withIp('22.33.44.55')
                .withPort(8888);
              manyPeers = trackerService.announce(otherPeerParams).peers;
            });

            describe('when this peer is registered before', function () {
              var updatedPeers, newParams;
              beforeEach(function () {
                newParams = params.withPort(7777);
                updatedPeers = trackerService.announce(newParams).peers;
              });
              it('doesn\'t change array length', function () {
                expect(updatedPeers.length).to.equal(manyPeers.length);
              });
              it('updates the existing record with new data not creating a new record', function () {
                expect(updatedPeers).to.contain({peerId: 'myPeerId', ip: '11.22.33.44', port: 7777});
              });
              it('keeps other peers unchanged', function () {
                expect(updatedPeers).to.contain({peerId: 'newPeerId', ip: '22.33.44.55', port: 8888});
              });
            });
          });
        });
      });
    });
  });
});
