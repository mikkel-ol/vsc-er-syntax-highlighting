const erd = require('erd')
let fs = require("fs");
let path = require("path");

/**
 * This function converts the erd syntax to svg of that erd
 * 
 * @param {A string that contains an ERD in the erd format} erdCode 
 * @returns The svg
 */
function erdToHTML( erdCode ){
    erd({ modelsText: erdCode, outputType: "html"});
    let vscodeRootDir = path.dirname(require.main.filename);
    let svg = fs.readFileSync(path.join( vscodeRootDir, "../erd.html"), { encoding: 'utf8' })
    return svg;
}

module.exports.activate = () => {
    return {
        extendMarkdownIt(md) {
            const highlight = md.options.highlight;
            md.options.highlight = (code, lang) => {
                if (lang && lang.match(/\ber\b/i)) {
                    return erdToHTML(code);
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