import Plugin1 from './src/Plugin1'
import Modularity from 'core'

window.Modularity.register (
    {
        name: 'Test plugin #1',
        version: '1.0.0',
        routes: [
            {
                path: '/plugin-1',
                component: Plugin1,
                meta: {
                    name: 'Plugin #1'
                }
            }
        ]
    }
)

console.log ('Plugin #1 JS')