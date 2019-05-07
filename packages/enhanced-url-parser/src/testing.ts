import EnhancedURLParser from './';



const test = async () => {
    const file = './index.html';
    const parserFile = new EnhancedURLParser({file});
    const enhancedURLDataFile = await parserFile.getData();
    console.log('enhancedURLDataFile\n', enhancedURLDataFile);
    console.log('------------');

    const content = `
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="enhanced-url:site" content="∂view">
                <meta name="enhanced-url:video" content="ikvCkkEnoaM">
                <meta name="enhanced-url:title" content="Ennja - Sora">
                <meta name="enhanced-url:query" content="t=140">

                <title>Enhnaced URL Parser</title>
            </head>

            <body>
                <div id="root">
                    The Application
                </div>
            </body>
        </html>
    `;
    const parserContent = new EnhancedURLParser({content});
    const enhancedURLDataContent = await parserContent.getData();
    console.log('enhancedURLDataContent\n', enhancedURLDataContent);
}

test();
