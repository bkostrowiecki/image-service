export class ImagePointer {
    constructor(private path: string) {
    }

    getPath() {
        return this.path;
    }

    getExtension() {
        const splitterPath = this.path.split('.');
        const extension = splitterPath[splitterPath.length - 1];
        return splitterPath.length > 1 ? extension.toLowerCase() : null;
    }
}