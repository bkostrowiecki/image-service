import { ImagePointer } from "./imagePointer";
import { ImageFinderStatus } from "./imageFinderStatus";

export class ImageFinderResult {
    constructor(private imagePointer: ImagePointer | null, private status: ImageFinderStatus) {
    }

    getImagePointer() {
        return this.imagePointer;
    }

    getStatus() {
        return this.status;
    }
}