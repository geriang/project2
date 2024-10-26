const { defineConfig } = require('@vue/cli-service')

require('dotenv').config()


module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://vueback.gach.work'
}
})
