"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageFinderStatus;
(function (ImageFinderStatus) {
    ImageFinderStatus[ImageFinderStatus["NotFound"] = 0] = "NotFound";
    ImageFinderStatus[ImageFinderStatus["ExactFound"] = 1] = "ExactFound";
    ImageFinderStatus[ImageFinderStatus["BiggerAvailable"] = 2] = "BiggerAvailable";
    ImageFinderStatus[ImageFinderStatus["SmallerAvailable"] = 3] = "SmallerAvailable";
})(ImageFinderStatus = exports.ImageFinderStatus || (exports.ImageFinderStatus = {}));
