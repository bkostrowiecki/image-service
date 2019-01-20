import { ImageMetadata } from './imageMetadata';
import { ImageFinderResult } from './imageFinderResult';
export declare class ImageService {
    private config;
    constructor();
    uploadImage(dataString: string): Promise<any>;
    private loadMetadata;
    getImage(imageMetadata: ImageMetadata): Promise<any>;
    findImage(imageMetadata: ImageMetadata): Promise<ImageFinderResult>;
    private createMetadataFromMatch;
    private createResizedImage;
}
