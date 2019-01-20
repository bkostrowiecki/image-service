import * as fs from 'fs';
import * as glob from 'glob';
import * as promisifyApi from 'typed-promisify';
import * as sharp from 'sharp';
import { ImageMetadata } from './imageMetadata';
import { ImageFinderResult } from './imageFinderResult';
import { ImageResponse } from './imageResponse';
import { ImageFinderStatus } from './imageFinderStatus';
import { ImagePointer } from './imagePointer';
import * as path from 'path';

export class ImageService {
    private config = {
        directory: path.join(__dirname, '../../data/images/'),
    };

    constructor() {
    }

    public uploadImage(dataString: string): Promise<any> {
        const matches = dataString.toString().match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        if (!matches || matches.length !== 3) {
            throw new Error('Invalid input string');
        }

        let type = '';
        const imageBuffer = new Buffer(matches[2], 'base64');

        if (matches[1] === 'image/jpeg') {
            type = '.jpg';
        } else if (matches[1] === 'image/png') {
            type = '.png';
        }

        const serviceConfig = this.config;

        return this.loadMetadata(imageBuffer).then((newImageMetadata: ImageMetadata) => {
            return sharp(imageBuffer)
                .toFile(serviceConfig.directory + newImageMetadata.getFilename() + type)
                .then(() => {
                    return Promise.resolve(newImageMetadata);
                })
        });
    }

    private loadMetadata(bufferData: Buffer): Promise<ImageMetadata> {
        return sharp(bufferData)
            .metadata()
            .then((metadata) => {
                const newImageMetadata = new ImageMetadata('', metadata.width, metadata.height);
                newImageMetadata.generateGuid();
                return (Promise as any).resolve(newImageMetadata);
            });
    }

    public getImage(imageMetadata: ImageMetadata): Promise<any> {
        return this.findImage(imageMetadata).then((result: ImageFinderResult) => {
            if (result == null) {
                return Promise.reject('Not found');
            }

            const imagePointer = result.getImagePointer();
            const status = result.getStatus();

            if (!imagePointer) {
                return Promise.reject('Image does not exist');
            }

            const extension = imagePointer.getExtension();

            if (!extension) {
                return Promise.reject('Not supported extension');
            }

            if (status === ImageFinderStatus.ExactFound) {
                const imageData = fs.readFileSync(imagePointer.getPath());
            
                return Promise.resolve(new ImageResponse(imageData, extension));
            } else if (status === ImageFinderStatus.NotFound) {
                return Promise.reject('Not found');
            } else if (status === ImageFinderStatus.SmallerAvailable) {
                const imageData = fs.readFileSync(imagePointer.getPath());

                return Promise.resolve(new ImageResponse(imageData, extension));
            } else if (status === ImageFinderStatus.BiggerAvailable) {
                return this.createResizedImage(imageMetadata, imagePointer).then((path) => {
                    const imageData = fs.readFileSync(path);

                    return Promise.resolve(new ImageResponse(imageData, extension));
                });
            } else {
                return Promise.reject('Not found');
            }
        }).catch(() => {
            return Promise.reject('Not found');
        });
    }

    public findImage(imageMetadata: ImageMetadata): Promise<ImageFinderResult> {
        const pathToFind = this.config.directory + imageMetadata.getSearchPattern();

        const globAsync = promisifyApi.promisify<any,any>(glob);

        const serviceConfig = this.config;

        const instance = this;

        return globAsync(pathToFind).then((matchedFiles: string[]) => {
            let result: ImageFinderResult;

            if (matchedFiles.length) {
                const exactMatch = matchedFiles.filter((singleMatch) => {
                    const thisMetadata = instance.createMetadataFromMatch(singleMatch, serviceConfig.directory);

                    return (thisMetadata.compareWithOther(imageMetadata));
                });

                const biggestMatched = matchedFiles.reduce((prevValue, currentMatch) => {
                    const thisMetadata = instance.createMetadataFromMatch(currentMatch, serviceConfig.directory);

                    if (prevValue && thisMetadata.biggerThanOther(prevValue)) {
                        return thisMetadata;
                    } else {
                        return prevValue;
                    }
                }, new ImageMetadata('', 0, 0));

                if (exactMatch.length) {
                    result = new ImageFinderResult(new ImagePointer(exactMatch[0]), ImageFinderStatus.ExactFound);
                } else if (biggestMatched.biggerThanOther(imageMetadata)) {
                    result = new ImageFinderResult(new ImagePointer(matchedFiles[0]), ImageFinderStatus.BiggerAvailable);
                } else if (matchedFiles.length > 0) {
                    result = new ImageFinderResult(new ImagePointer(matchedFiles[0]), ImageFinderStatus.SmallerAvailable);
                } else {
                    result = new ImageFinderResult(null, ImageFinderStatus.NotFound);
                }
            } else {
                return new ImageFinderResult(null, ImageFinderStatus.NotFound);
            }

            return Promise.resolve(result);
        }).catch(() => {
            return new ImageFinderResult(null, ImageFinderStatus.NotFound);
        });
    }

    private createMetadataFromMatch(singleMatch: string, directory: string) {
        const thisMetadata = new ImageMetadata();
        thisMetadata.applyFilename(singleMatch.replace(directory, ''));
        return thisMetadata;
    }

    private createResizedImage(destination: ImageMetadata, source: ImagePointer): Promise<string> {
        const serviceConfig = this.config;

        const destinationFile = serviceConfig.directory + destination.getFilename() + '.' + source.getExtension();

        return sharp(source.getPath())
            .resize(destination.getWidth(), destination.getHeight())
            .toFile(destinationFile)
            .then(() => {
                return Promise.resolve(destinationFile);
            })
            .catch(() => {
                return Promise.reject(null);
            })
    }
};