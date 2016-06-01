#!/usr/bin/env node

var Tracker = require('../release/tracker.js').default;
var tracker = new Tracker({verbose: true});

tracker.start(8686);

setTimeout(function () {
  tracker.close();
}, 10000);
