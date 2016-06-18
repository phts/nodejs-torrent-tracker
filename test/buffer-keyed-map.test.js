'use strict';
var expect = require('chai').expect;

describe('BufferKeyedMap', function () {
  var BufferKeyedMap = require('../release/buffer-keyed-map').default,
    instance,
    output;

  beforeEach(function () {
    instance = new BufferKeyedMap();
  });

  describe('#get', function () {
    var obj = {obj1: 'obj1'};
    beforeEach(function() {
      instance.data = {
        '\x00\xFE\xFF': obj,
        '\x01\xAA\xBB': {obj2: 'obj2'},
      };
      output = instance.get(Buffer.from([0, 0xFE, 0xFF]));
    });

    it('returns a stored object by its index', function() {
      expect(output).to.eql(obj);
    });
  });

  describe('#set', function() {
    var obj = {obj1: 'obj1'};
    beforeEach(function() {
      instance.data = {
        '\x01\xAA\xBB': {obj2: 'obj2'},
      };
      instance.set(Buffer.from([0x05, 0xAA, 0xFE, 0xFF]), obj);
    });

    it('stores the given object', function() {
      expect(instance.data['\x05\xAA\xFE\xFF']).to.eql(obj);
    });
  });

  describe('#delete', function() {
    beforeEach(function() {
      instance.data = {
        '\x05\xAA\xFE\xFF': {obj1: 'obj1'},
        '\x01\xAA\xBB': {obj2: 'obj2'},
      };
      instance.delete(Buffer.from([0x05, 0xAA, 0xFE, 0xFF]));
    });

    it('stores the given object', function() {
      expect(instance.data['\xAA\xFE\xFF']).to.be.undefined;
    });
  });

  describe('#getData', function() {
    var data = {
      '\x05\xAA\xFE\xFF': {obj1: 'obj1'},
      '\x01\xAA\xBB': {obj2: 'obj2'},
    };

    beforeEach(function() {
      instance.data = data;
      output = instance.getData();
    });

    it('returns an array of the map values', function() {
      expect(output).to.equal(data);
    });
  });

  describe('#getValues', function() {
    var obj1 =  {obj1: 'obj1'},
      obj2 = {obj2: 'obj2'};

    beforeEach(function() {
      instance.data = {
        '\x05\xAA\xFE\xFF': obj1,
        '\x01\xAA\xBB': obj2,
      };
      output = instance.getValues();
    });

    it('returns an array of the map values', function() {
      expect(output).to.eql([obj1, obj2]);
    });
  });
});
