const path = require ('path')
const webpackSupport = require ('core/webpackSupport')

let config = webpackSupport.baseConfig (
    './plugin.js',
    {
        filename: 'plugin-2.bundle.js',
        path: path.resolve (__dirname, 'dist')
    }
)

webpackSupport.pluginDevelopment (config)


module.exports = config