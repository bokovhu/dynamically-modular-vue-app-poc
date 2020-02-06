const webpackSupport = require ('./webpackSupport')
const path = require('path')

let config = webpackSupport.baseConfig (
    './index.js',
    {
        filename: 'core.bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
)
webpackSupport.production (config)

module.exports = config