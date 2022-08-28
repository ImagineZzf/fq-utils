const fs = require('fs')
const path = require('path')

const vuepressConfig = fs.readFileSync(
  path.resolve(__dirname, './vuepressConfig.js'),
  'utf8'
)
fs.writeFileSync(
  path.resolve(__dirname, './docs/.vuepress/config.js'),
  vuepressConfig
)