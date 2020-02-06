import Plugin2 from './src/Plugin2'
import Modularity from 'core'

window.Modularity.register (
    {
        name: 'Test plugin #2',
        version: '1.0.0',
        routes: [
            {
                path: '/plugin-2',
                component: Plugin2,
                meta: {
                    name: 'Plugin #2'
                }
            }
        ]
    }
)

console.log ('Plugin #2 JS')