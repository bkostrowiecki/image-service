"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var ImageMetadata = /** @class */ (function () {
    function ImageMetadata(guid, width, height) {
        this.guid = guid;
        this.width = width;
        this.height = height;
    }
    ImageMetadata.prototype.getGuid = function () {
        return this.guid ? this.guid : '';
    };
    ImageMetadata.prototype.getWidth = function () {
        return this.width ? this.width : 0;
    };
    ImageMetadata.prototype.getHeight = function () {
        return this.height ? this.height : 0;
    };
    ImageMetadata.prototype.getFilename = function () {
        return this.getGuid() + '_' + this.getWidth() + 'x' + this.getHeight();
    };
    ImageMetadata.prototype.getSearchPattern = function () {
        return this.getGuid() + '_*x*.*';
    };
    ImageMetadata.prototype.applyFilename = function (filename) {
        var chunks = filename.split('_');
        this.guid = chunks[0];
        var sizeChunks = chunks[1].split('x');
        this.width = parseInt(sizeChunks[0]);
        this.height = parseInt(sizeChunks[1].split('.')[0]);
    };
    ImageMetadata.prototype.compareWithOther = function (imageMetadata) {
        return (imageMetadata.getWidth() === this.getWidth() &&
            imageMetadata.getHeight() === this.getHeight() &&
            imageMetadata.getGuid() === this.getGuid());
    };
    ImageMetadata.prototype.biggerThanOther = function (imageMetadata) {
        return (this.getWidth() > imageMetadata.getWidth() &&
            this.getHeight() > imageMetadata.getHeight());
    };
    ImageMetadata.prototype.generateGuid = function () {
        this.guid = uuid_1.v1();
    };
    return ImageMetadata;
}());
exports.ImageMetadata = ImageMetadata;
;
