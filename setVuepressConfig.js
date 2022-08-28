const fs = require('fs')
const path = require('path')

const vuepressConfig = fs.readFileSync(
  path.resolve(__dirname, './vuepressConfig.js'),
  'utf8'
)
fs.writeFile(
  path.resolve(__dirname, './docs/.vuepress/config.js'),
  vuepressConfig,
  (err, data) => {}
)