import AnnounceParams from './announce-params';
import Event from './event';

var PARSERS = {
  info_hash: byteSequenceParser,
  peer_id: byteSequenceParser,
  ip: valueAsIsPasrer,
  port: numberValueParser,
  left: numberValueParser,
  event: eventValueParser,
};

function byteSequenceParser(value) {
  var result = [];
  for (let i = 0; i < value.length; i++) {
    if (value[i] === '%') {
      result.push(parseInt(value[i + 1] + value[i + 2], 16));
      i += 2;
    } else {
      result.push(value.charCodeAt(i));
    }
  }
  return Buffer.from(result).toString('binary');
}

function valueAsIsPasrer(value) {
  return value;
}

function numberValueParser(value) {
  return parseInt(value, 10);
}

function eventValueParser(value) {
  return Event[String(value)];
}

export default class AnnounceGetRequestParams implements AnnounceParams {
  infoHash: string;
  peerId: string;
  ip: string;
  port: number;
  left: number;
  event: Event;

  constructor(rawQuery: string, ip: string) {
    var pairs, query = {};

    pairs = (rawQuery || '').split('&');
    pairs.forEach(function(pair) {
      var values = pair.split('='),
        parser = PARSERS[values[0]];

      if (parser) {
        query[values[0]] = parser(values[1]);
      }
    });

    this.infoHash = query['info_hash'];
    this.peerId = query['peer_id'];
    this.ip = query['ip'] || ip;
    this.port = query['port'];
    this.left = query['left'];
    this.event = query['event'];
  }
}
