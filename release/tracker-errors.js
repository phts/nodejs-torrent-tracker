"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TrackerError = (function (_super) {
    __extends(TrackerError, _super);
    function TrackerError(message) {
        _super.call(this, message);
        this.message = message;
    }
    return TrackerError;
}(Error));
exports.TrackerError = TrackerError;
var NotFoundError = (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError() {
        _super.apply(this, arguments);
        this.statusCode = 404;
    }
    return NotFoundError;
}(TrackerError));
exports.NotFoundError = NotFoundError;
var RequestParamsError = (function (_super) {
    __extends(RequestParamsError, _super);
    function RequestParamsError() {
        _super.apply(this, arguments);
        this.statusCode = 400;
    }
    return RequestParamsError;
}(TrackerError));
exports.RequestParamsError = RequestParamsError;
var InternalServerError = (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError() {
        _super.apply(this, arguments);
        this.statusCode = 500;
    }
    return InternalServerError;
}(TrackerError));
exports.InternalServerError = InternalServerError;
