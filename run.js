#!/usr/bin/env node

const PORT = 8686;
var Tracker = require('./release/tracker.js').default;
var tracker = new Tracker({verbose: true});

tracker.start(PORT);
console.log(`http://localhost:${PORT}/announce`);
