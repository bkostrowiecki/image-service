import { ImagePointer } from "./imagePointer";

describe('ImagePointer', () => {
    it('returns whole path to file', () => {
        const pathToImage = '/path/to/image.png';
        const imagePointer = new ImagePointer(pathToImage);

        expect(imagePointer.getPath()).toEqual(pathToImage);
    });

    it('returns extension of file', () => {
        const pathToImage = '/path/to/image.png';
        const imagePointer = new ImagePointer(pathToImage);

        expect(imagePointer.getExtension()).toEqual('png');
    });

    it('returns extension of file in lowercase', () => {
        const pathToImage = '/path/to/image.PNG';
        const imagePointer = new ImagePointer(pathToImage);

        expect(imagePointer.getExtension()).toEqual('png');
    });

    it('returns extension of file when are more than 1 dot', () => {
        const pathToImage = '/path/to/image.test.PNG';
        const imagePointer = new ImagePointer(pathToImage);

        expect(imagePointer.getExtension()).toEqual('png');
    });

    it('returns nothing if there is no dot in a filename', () => {
        const pathToImage ='/path/to/image';
        const imagePointer = new ImagePointer(pathToImage);

        expect(imagePointer.getExtension()).toEqual(null);
    })
});