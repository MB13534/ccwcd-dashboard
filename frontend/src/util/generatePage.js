const fs = require("fs");
const directoryName = process.argv[2];

fs.mkdirSync("../pages/" + directoryName);
fs.writeFileSync(
  `../pages/${directoryName}/index.js`,
  `export { default } from "./${directoryName}"`
);
fs.writeFileSync(`../pages/${directoryName}/${directoryName}.js`, ``);
