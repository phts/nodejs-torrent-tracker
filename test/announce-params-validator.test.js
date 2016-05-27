'use strict';
var expect = require('chai').expect;
var AnnounceParamsValidator = require('../release/announce-params-validator').default;
var createAnnounceParams = require('./helpers/create-announce-params');

describe('AnnounceParamsValidator', function() {
  var parser, params;

  describe('#validate', function() {
    function throwsError (message) {
      it(`throws an Error "${message}"`, function () {
        expect(function() {
          parser.validate();
        }).to.throw(Error, message);
      });
    }

    beforeEach(function () {
      params = createAnnounceParams();
    });

    describe('when info hash is malformed', function () {
      beforeEach(function () {
        params.withInfoHash('invalid');
        parser = new AnnounceParamsValidator(params);
      });
      throwsError('Info hash parameter is invalid');
    });

    describe('when info hash is missing', function () {
      beforeEach(function () {
        params.without('infoHash');
        parser = new AnnounceParamsValidator(params);
      });
      throwsError('Info hash parameter is missing');
    });

    describe('when peer id is malformed', function () {
      beforeEach(function () {
        params.withPeerId('invalid');
        parser = new AnnounceParamsValidator(params);
      });
      throwsError('Peer id parameter is invalid');
    });

    describe('when peer id is missing', function () {
      beforeEach(function () {
        params.without('peerId');
        parser = new AnnounceParamsValidator(params);
      });
      throwsError('Peer id parameter is missing');
    });
  });
});
