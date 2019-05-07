import fs from 'fs';
import path from 'path';
import util from 'util';



interface ParserData {
    site: string;
    video: string;
    title: string;
    query: string;
    [key: string]: string | undefined;
}


interface ParserConstructor {
    file?: string;
    content?: string;
    [key: string]: string | undefined;
}

class EnhancedURLParser {
    private file: string | undefined;
    private content: string | undefined;
    private data: ParserData | undefined;

    constructor(options: ParserConstructor) {
        const { content, file } = options;

        if (file) {
            this.file = file;
        }

        if (content) {
            this.content = content;
        }
    }

    private async readFile() {
        if (this.file) {
            const readFile = util.promisify(fs.readFile);
            try {
                const content = await readFile(path.join(__dirname, this.file), {encoding: 'utf8'});
                this.processFile(content);
            } catch(err) {
                console.log(err);
            }
        }
    }

    private async processFile(content: string) {
        const data = {} as ParserData;
        const REs = [
            'site', 'video', 'title', 'query',
        ];

        const baseRE = (item: string) => {
            return `<meta name="enhanced-url:${item}" content="(.+)">`;
        }

        const checkRE = (_re: string, content: string) => {
            const re = new RegExp(_re);
            const match = content.match(re);
            if (match) {
                return match[1];
            }
        }

        for (const re of REs) {
            const _re = baseRE(re);
            data[re] = checkRE(_re, content);
        }

        this.data = data;
    }

    public async getData() {
        if (this.file) {
            await this.readFile();
        }
        if (this.content) {
            await this.processFile(this.content);
        }
        return this.data;
    }
}


export default EnhancedURLParser;
