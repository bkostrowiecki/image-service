import { ImagePointer } from "./imagePointer";
import { ImageFinderStatus } from "./imageFinderStatus";
export declare class ImageFinderResult {
    private imagePointer;
    private status;
    constructor(imagePointer: ImagePointer | null, status: ImageFinderStatus);
    getImagePointer(): ImagePointer | null;
    getStatus(): ImageFinderStatus;
}
