const fs = require("fs");
const directoryName = process.argv[2];

fs.mkdirSync("../components/" + directoryName);
fs.writeFileSync(
  `../components/${directoryName}/index.js`,
  `export { default } from "./${directoryName}"`
);
fs.writeFileSync(`../components/${directoryName}/${directoryName}.js`, ``);
