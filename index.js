const erd = require("erd");
let fs = require("fs");
let path = require("path");

/**
 * This function converts the erd syntax to svg of that erd
 *
 * @param {A string that contains an ERD in the erd format} erdCode
 * @returns The svg
 */
function erdToHTML(erdCode) {
  try {
    erd({ modelsText: erdCode, outputType: "html" });
    return fs.readFileSync("erd.html", { encoding: "utf8" });
  } catch (err) {
    console.log("Error converting erd to html. " + err.message);
    return fs.readFileSync(code);
  }
}

/**
 * This function is called by the onLanguage activation event.
 * When changes to er code in a markdown document are made, this function
 * converts the updated er code to HTML using erdToHTML.
 *
 * @see https://code.visualstudio.com/api/references/activation-events
 * @see https://vscode-eastus.azurewebsites.net/api/extension-guides/markdown-extension
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
    },
  };
};
