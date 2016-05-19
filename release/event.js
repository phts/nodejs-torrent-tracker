"use strict";
var Event;
(function (Event) {
    Event[Event["stopped"] = 0] = "stopped";
    Event[Event["started"] = 1] = "started";
    Event[Event["completed"] = 2] = "completed";
})(Event || (Event = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Event;
