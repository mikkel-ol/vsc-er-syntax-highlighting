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
    return fs.readFileSync("erd.html", { encoding: 'utf8' })
}

/**
 * 
 */
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