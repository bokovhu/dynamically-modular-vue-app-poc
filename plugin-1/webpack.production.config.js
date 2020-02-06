const path = require ('path')
const webpackSupport = require ('core/webpackSupport')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let config = webpackSupport.baseConfig (
    './plugin.js',
    {
        filename: 'plugin-1.bundle.js',
        path: path.resolve (__dirname, 'dist')
    }
)

webpackSupport.pluginProduction (config)

module.exports = config