const { sleep } = require("./utils");
const fs = require("fs");
const axios = require("axios");
var beautify = require('js-beautify/js').js

const targets = [
  { url: "https://hotellabs.marriott.com/js/app.387a4a64.js", folder: "hotellabs.marriott.com"},
  { url: "https://hotellabs.marriott.com/js/chunk-vendors.069eb9cb.js", folder: "hotellabs.marriott.com"},
  { url: "https://www.marriott.com/resources/1886d59e46406f938b23f5e9f0ee55b0f0aafa2feb045", folder: "marriott.com"},
  { url: "https://extranetcloud.marriott.com/common/js/marriottCommon.js?seed=AICjamuMAQAA0QfnXoQYf90iZN_cvRXhEEFC2kDo-Ua7B2gyygGiwjw3FpW2&X-aZnN0eCb--z=asdasd", folder: "extranetcloud.marriott.com"},
  { url: "https://www.marriott.com/rwuW/bALl/Dnlx/75/cJlw/9Q3mkfXhSm/ZmILAg/Dj94OXV/xGScB", folder: "marriott.com"},
];

async function main() {
  for (const target of targets) {
    await sleep(1000);
    const properFileName = target.url.replace(/https?:\/\//, "").replace(/\//g, "_");
    try {
      const response = await axios.get(target.url);
      const cleanJs = beautify(response.data, { indent_size: 2, space_in_empty_paren: true });

      if (!fs.existsSync("responses")) {
        fs.mkdirSync("responses");
      }

      if (!fs.existsSync(`responses/${target.folder}`)) {
        fs.mkdirSync(`responses/${target.folder}`);
      }

      fs.writeFileSync(`responses/${properFileName}`, `${cleanJs}`, {
        flag: "w",
        encoding: "utf-8",
      });
    } catch (error) {
      fs.writeFileSync(`responses/${properFileName}`, `${error}`, {
        flag: "w",
        encoding: "utf-8",
      });
    }
  }
}


main();