const path = require ('path')
const webpackSupport = require ('core/webpackSupport')

let config = webpackSupport.baseConfig (
    './plugin.js',
    {
        filename: 'plugin-1.bundle.js',
        path: path.resolve (__dirname, 'dist')
    }
)

webpackSupport.pluginDevelopmentWithBackend (config)


module.exports = config