const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

const htmlPluginForCore = () => new HtmlWebpackPlugin(
    {
        title: 'Modularity',
        template: 'src/index_full.html.ejs'
    }
)
const htmlPluginForPlugin = () => new HtmlWebpackPlugin(
    {
        title: 'Modularity',
        template: '../core/src/index_full.html.ejs'
    }
)
const moduleRules = [
    {
        test: /\.vue$/,
        loader: 'vue-loader'
    },
    {
        test: /\.js$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            }
        ]
    },
    {
        test: /\.css$/,
        use: [
            'vue-style-loader',
            'css-loader'
        ]
    },
    {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }
        ]
    },
    {
        test: /\.(png|jpg|jpeg|bmp)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                }
            }
        ]
    }
]

const exposeCoreRule = {
    test: require.resolve('./src/core.js'),
    use: [
        {
            loader: 'expose-loader',
            options: 'core'
        }
    ]
}
const exposeCoreForPluginRule = {
    test: require.resolve('../core/src/core.js'),
    use: [
        {
            loader: 'expose-loader',
            options: 'core'
        }
    ]
}

const applyBase = config => {
    config.resolve = { ... (config.resolve || {}) }
    config.resolve.extensions = [... (config.resolve.extensions || [])]
    config.resolve.extensions.push('.js', '.vue', '.css')
/*
    config.externals = { ... (config.externals || {}) }
    config.externals.vue = 'Vue'
*/
    config.plugins = [... (config.plugins || [])]
    config.plugins.push(new VueLoaderPlugin())
}

const applyModule = config => {
    config.module = { ... (config.module || {}) }
    config.module.rules = [... (config.module.rules || [])]
    moduleRules.forEach(rule => config.module.rules.push(rule))
}

const applyDevServer = (config, base, port) => {
    config.devServer = { ... (config.devServer || {}) }
    config.devServer.contentBase = path.resolve(base, 'public')
    config.devServer.port = port
    config.devServer.compress = true
}

module.exports = {
    htmlPluginForPlugin,
    moduleRules,
    exposeCoreForPluginRule,
    applyBase,
    applyModule,
    applyDevServer,
    baseConfig: (entry, output, devServerContentBase = __dirname, devServerPort = 9000) => {
        let config = {
            entry: entry,
            output: output
        }
        applyModule(config)
        applyBase(config)
        applyDevServer(config, devServerContentBase, devServerPort)
        return config
    },
    production: config => {
        config.plugins = [... (config.plugins || [])]
        config.plugins.push(
            new webpack.DefinePlugin(
                {
                    'window.PRODUCTION': JSON.stringify('true'),
                    'window.BACKEND_URL': JSON.stringify('http://localhost:8080/graphql')
                }
            )
        )
        config.plugins.push(htmlPluginForCore())

        config.module.rules = [... (config.module.rules || [])]
        config.module.rules.push(exposeCoreRule)
    },
    coreDevelopment: config => {
        config.plugins = [... (config.plugins || [])]
        config.plugins.push(
            new webpack.DefinePlugin(
                {
                    'window.CORE_DEVELOPMENT': JSON.stringify('true')
                }
            )
        )
        config.plugins.push(htmlPluginForCore())

        config.module.rules = [... (config.module.rules || [])]
        config.module.rules.push(exposeCoreRule)
    },
    pluginDevelopment: config => {
        config.plugins = [... (config.plugins || [])]
        config.plugins.push(
            new webpack.DefinePlugin(
                {
                    'window.PLUGIN_DEVELOPMENT': JSON.stringify('true')
                }
            )
        )
        config.plugins.push(htmlPluginForPlugin())

        config.module.rules = [... (config.module.rules || [])]
        config.module.rules.push(exposeCoreForPluginRule)
    },
    pluginDevelopmentWithBackend: config => {
        config.plugins = [... (config.plugins || [])]
        config.plugins.push(
            new webpack.DefinePlugin(
                {
                    'window.PRODUCTION': JSON.stringify('true'),
                    'window.BACKEND_URL': JSON.stringify('http://localhost:8080/graphql')
                }
            )
        )
        config.plugins.push(htmlPluginForPlugin())

        config.module.rules = [... (config.module.rules || [])]
        config.module.rules.push(exposeCoreForPluginRule)
    },
    pluginProduction: config => {
        config.plugins = [... (config.plugins || [])]
        config.plugins.push(
            new webpack.DefinePlugin(
                {
                    'window.PRODUCTION': JSON.stringify('true'),
                    'window.BACKEND_URL': JSON.stringify('http://localhost:8080/graphql')
                }
            )
        )

        config.module.rules = [... (config.module.rules || [])]
        config.module.rules.push(exposeCoreForPluginRule)

        config.externals = { ... (config.externals || {}) }
        config.externals.core = 'core'
    }
}