"use strict";
var errors = require('./tracker-errors');
var AnnounceParamsParser = (function () {
    function AnnounceParamsParser(rawParams) {
        this.rawParams = rawParams;
    }
    AnnounceParamsParser.prototype.parse = function () {
        // try {
        if (Buffer.byteLength(this.rawParams['info_hash']) !== 20) {
            throw new errors.RequestParamsError('Invalid info_hash');
        }
        // } catch (err) {
        //     console.log('err', err.message);
        //     console.log('err', err.stack);
        // }
        // raise ArgumentError.new('Invalid peer id') if params[:peer_id].bytesize != 20
        // raise ArgumentError.new('Wrong info_hash for this tracker') unless same_info_hash? (params[:info_hash])
        // raise ArgumentError.new('Invalid numwant') if params[:numwant] > CONF[:max_peers]
        return {};
    };
    return AnnounceParamsParser;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnnounceParamsParser;
