import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './Main'

import ModularityPluginFetcher from './lib/modularity-plugin-fetcher'

import './components/prime'

export class Modularity {

    constructor () {
        this.plugins = []
        this.routes = []
        this.vueRouter = []
        this.vm = null;
    }

    register (plugin) {
        
        this.plugins.push (plugin)
        if (plugin.routes) {
            plugin.routes.forEach (this.addRoute.bind(this))
        }
        console.log (`Registered plugin ${plugin}`)

    }

    addRoute (route) {

        this.routes.push (route)
        this.vueRouter.addRoutes ([route])
        this.vm.$root.$emit ('Modularity.RouteAdded')

    }

    boostrapForBackend (options) {
        let fetcher = new ModularityPluginFetcher (
            {
                url: options.backend.url
            }
        )
        fetcher.fetchPlugins (this.pluginFetchFailed.bind (this))
    }

    pluginFetchFailed (err) {
        this.vm.$root.$emit ('Modularity.PluginFetchFailed', err)
    }

    bootstrapWithoutBackend () {

    }

    bootstrap (options) {

        Vue.use (VueRouter)
        this.vueRouter = new VueRouter ()
        let router = this.vueRouter

        this.vm = new Vue (
            {
                router: router,
                render: h => h(Main)
            }
        ).$mount ('#app')
        
        if (options.backend && options.backend.enabled) {
            this.boostrapForBackend (options)
        } else {
            this.bootstrapWithoutBackend ()
        }

    }

}

if (!window.Modularity) {

    window.Modularity = new Modularity ({})
    window.Vue = Vue

    if (window.PRODUCTION) {
        window.Modularity.bootstrap (
            {
                backend: {
                    enabled: true,
                    url: window.BACKEND_URL
                }
            }
        )
    } else if (window.CORE_DEVELOPMENT || window.PLUGIN_DEVELOPMENT) {
        window.Modularity.bootstrap (
            {
                backend: {
                    enabled: false
                }
            }
        )
    }

}

export {
    Vue,
    VueRouter
}