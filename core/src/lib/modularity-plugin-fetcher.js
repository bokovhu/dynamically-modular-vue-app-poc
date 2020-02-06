
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

export default class ModularityPluginFetcher {

    constructor (options) {
        this.url = options.url || (env || {}).backendUrl || 'http://localhost:8080/graphql'
    }

    fetchPlugins (onFailed = (err) => console.log (err)) {

        console.log ('Fetching modularity plugins ...')

        this.retreivePluginsList (
            this.loadPlugins,
            onFailed
        )

    }

    retreivePluginsList (
        onDone = (plugins) => console.log (plugins), 
        onFailed = (err) => console.log(err)
    ) {

        let client = new ApolloClient (
            {
                uri: this.url
            }
        )
        console.log ('Created apollo client')

        client.query (
            {
                query: gql`{plugins}`
            }
        ).then (
            result => {
                console.log (`GraphQL result: ${result}`)
                if (result.errors) {
                    onFailed (result.errors)
                } else {
                    onDone (result.data.plugins)
                }
            }
        ).catch (
            err => {
                console.log (`GraphQL error: ${err}`)
                onFailed (err)
            }
        )

    }

    loadPlugins (plugins) {

        plugins.forEach (
            plugin => {
                console.log (`Loading plugin from ${plugin} ...`)
                let newScriptTag = document.createElement ('script')
                newScriptTag.setAttribute ('src', plugin)
                document.body.appendChild (newScriptTag)
            }
        )

    }

}