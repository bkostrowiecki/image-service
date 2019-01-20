import { ImageFinderResult } from "./imageFinderResult";
import { ImagePointer } from "./imagePointer";
import { ImageFinderStatus } from "./imageFinderStatus";

describe('ImageFinderResult', () => {
    it('gets image pointer', () => {
        const pathToImage = '/path/to/image.PNG';
        const imagePointer = new ImagePointer(pathToImage);

        const imageFinderResult = new ImageFinderResult(imagePointer, ImageFinderStatus.NotFound);

        expect(imageFinderResult.getImagePointer()).toEqual(imagePointer);
    });

    it('gets finder status', () => {
        const pathToImage = '/path/to/image.PNG';
        const imagePointer = new ImagePointer(pathToImage);

        const imageFinderResult = new ImageFinderResult(imagePointer, ImageFinderStatus.NotFound);

        expect(imageFinderResult.getStatus()).toEqual(ImageFinderStatus.NotFound);
    });
});