"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImagePointer = /** @class */ (function () {
    function ImagePointer(path) {
        this.path = path;
    }
    ImagePointer.prototype.getPath = function () {
        return this.path;
    };
    ImagePointer.prototype.getExtension = function () {
        var splitterPath = this.path.split('.');
        var extension = splitterPath[splitterPath.length - 1];
        return splitterPath.length > 1 ? extension.toLowerCase() : null;
    };
    return ImagePointer;
}());
exports.ImagePointer = ImagePointer;
