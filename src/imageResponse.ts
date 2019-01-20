import { v1 }  from 'uuid';
import { ImageContentType } from './imageContentType';

export class ImageResponse {
    contentType: ImageContentType;
    binary: Buffer;

    constructor(buffer: Buffer, extension: string) {
        this.binary = buffer;

        let trimedExtension = extension.replace('.', '').trim().toLowerCase();

        if (trimedExtension === 'png') {
            this.contentType = ImageContentType.Png;
        } else if (trimedExtension === 'jpeg' || trimedExtension === 'jpg') {
            this.contentType = ImageContentType.Jpg;
        } else if (trimedExtension === 'gif') {
            this.contentType = ImageContentType.Gif;
        } else {
            throw new Error('Wrong extension given for ImageResponse');
        }
    }

    public getBinary() {
        return this.binary;
    }

    public getContentTypeHeader() {
        switch (this.contentType) {
            case ImageContentType.Png: 
                return 'image/png';
            case ImageContentType.Jpg:
                return 'image/jpeg';
            case ImageContentType.Gif:
                return 'image/gif';
            default:
                return 'text/plain';
        }
    }
}