"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var glob = require("glob");
var promisifyApi = require("typed-promisify");
var sharp = require("sharp");
var imageMetadata_1 = require("./imageMetadata");
var imageFinderResult_1 = require("./imageFinderResult");
var imageResponse_1 = require("./imageResponse");
var imageFinderStatus_1 = require("./imageFinderStatus");
var imagePointer_1 = require("./imagePointer");
var path = require("path");
var ImageService = /** @class */ (function () {
    function ImageService() {
        this.config = {
            directory: path.join(__dirname, '../../data/images/'),
        };
    }
    ImageService.prototype.uploadImage = function (dataString) {
        var matches = dataString.toString().match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid input string');
        }
        var type = '';
        var imageBuffer = new Buffer(matches[2], 'base64');
        if (matches[1] === 'image/jpeg') {
            type = '.jpg';
        }
        else if (matches[1] === 'image/png') {
            type = '.png';
        }
        var serviceConfig = this.config;
        return this.loadMetadata(imageBuffer).then(function (newImageMetadata) {
            return sharp(imageBuffer)
                .toFile(serviceConfig.directory + newImageMetadata.getFilename() + type)
                .then(function () {
                return Promise.resolve(newImageMetadata);
            });
        });
    };
    ImageService.prototype.loadMetadata = function (bufferData) {
        return sharp(bufferData)
            .metadata()
            .then(function (metadata) {
            var newImageMetadata = new imageMetadata_1.ImageMetadata('', metadata.width, metadata.height);
            newImageMetadata.generateGuid();
            return Promise.resolve(newImageMetadata);
        });
    };
    ImageService.prototype.getImage = function (imageMetadata) {
        var _this = this;
        return this.findImage(imageMetadata).then(function (result) {
            if (result == null) {
                return Promise.reject('Not found');
            }
            var imagePointer = result.getImagePointer();
            var status = result.getStatus();
            if (!imagePointer) {
                return Promise.reject('Image does not exist');
            }
            var extension = imagePointer.getExtension();
            if (!extension) {
                return Promise.reject('Not supported extension');
            }
            if (status === imageFinderStatus_1.ImageFinderStatus.ExactFound) {
                var imageData = fs.readFileSync(imagePointer.getPath());
                return Promise.resolve(new imageResponse_1.ImageResponse(imageData, extension));
            }
            else if (status === imageFinderStatus_1.ImageFinderStatus.NotFound) {
                return Promise.reject('Not found');
            }
            else if (status === imageFinderStatus_1.ImageFinderStatus.SmallerAvailable) {
                var imageData = fs.readFileSync(imagePointer.getPath());
                return Promise.resolve(new imageResponse_1.ImageResponse(imageData, extension));
            }
            else if (status === imageFinderStatus_1.ImageFinderStatus.BiggerAvailable) {
                return _this.createResizedImage(imageMetadata, imagePointer).then(function (path) {
                    var imageData = fs.readFileSync(path);
                    return Promise.resolve(new imageResponse_1.ImageResponse(imageData, extension));
                });
            }
            else {
                return Promise.reject('Not found');
            }
        }).catch(function () {
            return Promise.reject('Not found');
        });
    };
    ImageService.prototype.findImage = function (imageMetadata) {
        var pathToFind = this.config.directory + imageMetadata.getSearchPattern();
        var globAsync = promisifyApi.promisify(glob);
        var serviceConfig = this.config;
        var instance = this;
        return globAsync(pathToFind).then(function (matchedFiles) {
            var result;
            if (matchedFiles.length) {
                var exactMatch = matchedFiles.filter(function (singleMatch) {
                    var thisMetadata = instance.createMetadataFromMatch(singleMatch, serviceConfig.directory);
                    return (thisMetadata.compareWithOther(imageMetadata));
                });
                var biggestMatched = matchedFiles.reduce(function (prevValue, currentMatch) {
                    var thisMetadata = instance.createMetadataFromMatch(currentMatch, serviceConfig.directory);
                    if (prevValue && thisMetadata.biggerThanOther(prevValue)) {
                        return thisMetadata;
                    }
                    else {
                        return prevValue;
                    }
                }, new imageMetadata_1.ImageMetadata('', 0, 0));
                if (exactMatch.length) {
                    result = new imageFinderResult_1.ImageFinderResult(new imagePointer_1.ImagePointer(exactMatch[0]), imageFinderStatus_1.ImageFinderStatus.ExactFound);
                }
                else if (biggestMatched.biggerThanOther(imageMetadata)) {
                    result = new imageFinderResult_1.ImageFinderResult(new imagePointer_1.ImagePointer(matchedFiles[0]), imageFinderStatus_1.ImageFinderStatus.BiggerAvailable);
                }
                else if (matchedFiles.length > 0) {
                    result = new imageFinderResult_1.ImageFinderResult(new imagePointer_1.ImagePointer(matchedFiles[0]), imageFinderStatus_1.ImageFinderStatus.SmallerAvailable);
                }
                else {
                    result = new imageFinderResult_1.ImageFinderResult(null, imageFinderStatus_1.ImageFinderStatus.NotFound);
                }
            }
            else {
                return new imageFinderResult_1.ImageFinderResult(null, imageFinderStatus_1.ImageFinderStatus.NotFound);
            }
            return Promise.resolve(result);
        }).catch(function () {
            return new imageFinderResult_1.ImageFinderResult(null, imageFinderStatus_1.ImageFinderStatus.NotFound);
        });
    };
    ImageService.prototype.createMetadataFromMatch = function (singleMatch, directory) {
        var thisMetadata = new imageMetadata_1.ImageMetadata();
        thisMetadata.applyFilename(singleMatch.replace(directory, ''));
        return thisMetadata;
    };
    ImageService.prototype.createResizedImage = function (destination, source) {
        var serviceConfig = this.config;
        var destinationFile = serviceConfig.directory + destination.getFilename() + '.' + source.getExtension();
        return sharp(source.getPath())
            .resize(destination.getWidth(), destination.getHeight())
            .toFile(destinationFile)
            .then(function () {
            return Promise.resolve(destinationFile);
        })
            .catch(function () {
            return Promise.reject(null);
        });
    };
    return ImageService;
}());
exports.ImageService = ImageService;
;
