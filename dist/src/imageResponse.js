"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var imageContentType_1 = require("./imageContentType");
var ImageResponse = /** @class */ (function () {
    function ImageResponse(buffer, extension) {
        this.binary = buffer;
        var trimedExtension = extension.replace('.', '').trim().toLowerCase();
        if (trimedExtension === 'png') {
            this.contentType = imageContentType_1.ImageContentType.Png;
        }
        else if (trimedExtension === 'jpeg' || trimedExtension === 'jpg') {
            this.contentType = imageContentType_1.ImageContentType.Jpg;
        }
        else if (trimedExtension === 'gif') {
            this.contentType = imageContentType_1.ImageContentType.Gif;
        }
        else {
            throw new Error('Wrong extension given for ImageResponse');
        }
    }
    ImageResponse.prototype.getBinary = function () {
        return this.binary;
    };
    ImageResponse.prototype.getContentTypeHeader = function () {
        switch (this.contentType) {
            case imageContentType_1.ImageContentType.Png:
                return 'image/png';
            case imageContentType_1.ImageContentType.Jpg:
                return 'image/jpeg';
            case imageContentType_1.ImageContentType.Gif:
                return 'image/gif';
            default:
                return 'text/plain';
        }
    };
    return ImageResponse;
}());
exports.ImageResponse = ImageResponse;
