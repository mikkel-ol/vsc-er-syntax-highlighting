//import erd from 'erd'

/**
 * This function converts the erd syntax to svg of that erd
 * 
 * @param {A string that contains an ERD in the erd format} erdCode 
 * @returns The svg
 */
function erdToHTML( erdCode ){
    erd({ modelsText: erdCode, outputType: "html"});
    return fs.readFileSync(path.join(__dirname, "./erd.html"), { encoding: 'utf8' });
}

module.exports.activate = () => {
    return {
        extendMarkdownIt(md) {
            const highlight = md.options.highlight;
            md.options.highlight = (code, lang) => {
                if (lang && lang.match(/\ber\b/i)) {
                    console.log(code);
                    return `HIHIHIH${code}`;
                    //return erdToHTML(code);
                }
                return highlight(code, lang);
            };
            return md;
        }
    }
}


//import * as vscode from 'vscode';

// export function activate(context: vscode.ExtensionContext) {
//   return {
//     extendMarkdownIt(md: any) {
//       console.log("HIHIHIH");
//       return md;
//     }
//   };
// }