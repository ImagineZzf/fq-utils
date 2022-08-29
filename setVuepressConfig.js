const fs = require('fs')
const path = require('path')

const vuepressConfig = fs.readFileSync('./vuepressConfig.js')

fs.mkdir('./docs/.vuepress', { recursive: true }, () => {
  fs.writeFile('./docs/.vuepress/config.js', vuepressConfig, {}, () => {})
})
