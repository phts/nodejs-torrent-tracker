var t = require('../release/tracker.js');
var tracker = new t.Tracker();

tracker.start(8787);

setTimeout(function () {
  tracker.close();
}, 10000);
