const { sleep } = require("./utils");
const axios = require("axios");

const targets = [
  ""
];

async function main() {
  for (const target of targets) {
    await sleep(1000);
    const response = await axios.get(target);
    fs.writeFileSync(`responses/${target}`, `${response.data}`, {
      encoding: "utf-8",
    });
  }
}


main();