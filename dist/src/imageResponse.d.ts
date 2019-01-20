/// <reference types="node" />
import { ImageContentType } from './imageContentType';
export declare class ImageResponse {
    contentType: ImageContentType;
    binary: Buffer;
    constructor(buffer: Buffer, extension: string);
    getBinary(): Buffer;
    getContentTypeHeader(): "image/png" | "image/jpeg" | "image/gif" | "text/plain";
}
