const { sleep } = require("./utils");
const fs = require("fs");
const axios = require("axios");
var beautify = require('js-beautify/js').js

const targets = [
  "https://hotellabs.marriott.com/js/app.387a4a64.js"
];

async function main() {
  for (const target of targets) {
    await sleep(1000);
    const response = await axios.get(target);
    const properFileName = target.replace(/https?:\/\//, "").replace(/\//g, "_");
    const cleanJs = beautify(response.data, { indent_size: 2, space_in_empty_paren: true });
    fs.writeFileSync(`responses/${properFileName}`, `${cleanJs}`, {
      flag: "w",
      encoding: "utf-8",
    });
  }
}


main();