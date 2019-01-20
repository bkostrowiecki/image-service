import { ImageResponse } from "./imageResponse";

describe('ImageResponse', () => {
    it('gets binary image', () => {
        const buffer = '';

        const imageResponse = new ImageResponse(new Buffer(buffer), 'png');

        expect(imageResponse.getBinary()).toEqual(new Buffer(buffer));
    });

    it('throws error when given image extension is not supported', () => {
        const buffer = '';
        
        expect(() => {
            new ImageResponse(new Buffer(buffer), 'tiff');
        }).toThrowError('Wrong extension given for ImageResponse');
    });

    let examples: any = {
        'png': 'image/png',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'gif': 'image/gif'
    };
    Object.keys(examples).forEach((imgExtension: string) => {
        it('returns proper content headers based on extension - ' + imgExtension, () => {
            const buffer = '';
        
            const imageResponse = new ImageResponse(new Buffer(buffer), imgExtension);

            expect(imageResponse.getContentTypeHeader()).toEqual(examples[imgExtension]);
        });
    });
});