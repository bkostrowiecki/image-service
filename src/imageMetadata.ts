import { v1 }  from 'uuid';

export class ImageMetadata {
    constructor(private guid?: string, private width?: number, private height?: number) {
    }

    getGuid(): string {
        return this.guid ? this.guid : '';
    }

    getWidth(): number {
        return this.width ? this.width : 0;
    }

    getHeight(): number {
        return this.height ? this.height : 0;
    }

    getFilename(): string {
        return this.getGuid() + '_' + this.getWidth() + 'x' + this.getHeight();
    }

    getSearchPattern(): string {
        return this.getGuid() + '_*x*.*';
    }

    applyFilename(filename: string): void {
        let chunks = filename.split('_');
        this.guid = chunks[0];

        let sizeChunks = chunks[1].split('x');
        this.width = parseInt(sizeChunks[0]);
        this.height = parseInt(sizeChunks[1].split('.')[0]); 
    }

    compareWithOther(imageMetadata: ImageMetadata): boolean {
        return (imageMetadata.getWidth() === this.getWidth() && 
            imageMetadata.getHeight() === this.getHeight() && 
            imageMetadata.getGuid() === this.getGuid())
    }

    biggerThanOther(imageMetadata: ImageMetadata): boolean {
        return (this.getWidth() > imageMetadata.getWidth() && 
            this.getHeight() > imageMetadata.getHeight())
    }

    generateGuid() {
        this.guid = v1();
    }
};