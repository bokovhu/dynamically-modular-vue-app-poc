<template>
    <div>
        <p>Hello from core!</p>
        <ul>
            <li v-for="route in routes" :key="route.path">
                <router-link v-bind:to="route.path">{{route.meta.name}}</router-link>
            </li>
        </ul>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data () {
        return {
            routes: []
        }
    },
    mounted () {

        this.$root.$on ('Modularity.RouteAdded', this.routeAdded.bind(this))

    },
    methods: {
        routeAdded () {
            this.routes = window.Modularity.routes
        }
    }
}
</script>

<style>
p {
    color: red;
}
</style>