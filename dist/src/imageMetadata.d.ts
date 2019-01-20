export declare class ImageMetadata {
    private guid?;
    private width?;
    private height?;
    constructor(guid?: string | undefined, width?: number | undefined, height?: number | undefined);
    getGuid(): string;
    getWidth(): number;
    getHeight(): number;
    getFilename(): string;
    getSearchPattern(): string;
    applyFilename(filename: string): void;
    compareWithOther(imageMetadata: ImageMetadata): boolean;
    biggerThanOther(imageMetadata: ImageMetadata): boolean;
    generateGuid(): void;
}
