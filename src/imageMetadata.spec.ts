import { ImageMetadata } from './imageMetadata';

describe('ImageMetadata', () => {
    const guid = 'guid';

    it('gets guid', () => {
        const width = 400;
        const height = 400;

        const imageMetadata = new ImageMetadata(guid, width, height);

        expect(imageMetadata.getGuid()).toEqual(guid);
    });

    it('gets width', () => {
        const width = 400;
        const height = 300;

        const imageMetadata = new ImageMetadata(guid, width, height);

        expect(imageMetadata.getWidth()).toEqual(width);
    });

    it('gets height', () => {
        const width = 400;
        const height = 300;

        const imageMetadata = new ImageMetadata(guid, width, height);

        expect(imageMetadata.getHeight()).toEqual(height);
    });

    it('gets filename', () => {
        const width = 400;
        const height = 300;

        const imageMetadata = new ImageMetadata(guid, width, height);

        expect(imageMetadata.getFilename()).toEqual(`${guid}_${width}x${height}`);
    });

    it('gets search pattern', () => {
        const width = 400;
        const height = 300;

        const imageMetadata = new ImageMetadata(guid, width, height);

        expect(imageMetadata.getSearchPattern()).toEqual(`${guid}_*x*.*`);
    });

    it('applies filename', () => {
        const width = 400;
        const height = 300;

        const imageMetadata = new ImageMetadata(guid, width, height);
        imageMetadata.applyFilename(`${guid}_300x400`);

        expect(imageMetadata.getWidth()).toEqual(300);
        expect(imageMetadata.getHeight()).toEqual(400);
        expect(imageMetadata.getGuid()).toEqual(guid);
    });

    it('is the same by comparission', () => {
        const width = 400;
        const height = 300;

        const imageMetadata = new ImageMetadata(guid, width, height);
        const otherImageMetadata = new ImageMetadata(guid, width, height);

        expect(imageMetadata.compareWithOther(otherImageMetadata)).toEqual(true);
    });

    it('is bigger than other image', () => {
        const width = 400;
        const height = 300;

        const imageMetadata = new ImageMetadata(guid, width * 2, height * 2);
        const otherImageMetadata = new ImageMetadata(guid, width, height);

        expect(imageMetadata.biggerThanOther(otherImageMetadata)).toEqual(true);
    });

    it('is not bigger than other image', () => {
        const width = 400;
        const height = 300;

        const imageMetadata = new ImageMetadata(guid, width * 0.5, height * 0.5);
        const otherImageMetadata = new ImageMetadata(guid, width, height);

        expect(imageMetadata.biggerThanOther(otherImageMetadata)).toEqual(false);
    });

    it('generates guid', () => {
        const imageMetadata = new ImageMetadata();

        expect(imageMetadata.getGuid()).toBeFalsy();

        imageMetadata.generateGuid();
        
        expect(imageMetadata.getGuid()).not.toBeFalsy();
    });
});