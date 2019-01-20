"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageFinderResult = /** @class */ (function () {
    function ImageFinderResult(imagePointer, status) {
        this.imagePointer = imagePointer;
        this.status = status;
    }
    ImageFinderResult.prototype.getImagePointer = function () {
        return this.imagePointer;
    };
    ImageFinderResult.prototype.getStatus = function () {
        return this.status;
    };
    return ImageFinderResult;
}());
exports.ImageFinderResult = ImageFinderResult;
