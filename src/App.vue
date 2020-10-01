<template>
    <div id="app">
        <Player :route="route" />
    </div>
</template>

<script>
import Player from './Player';
import mainService from './services/main.service';

export default {
    name: 'App',
    components: {
        Player
    },
    data() {
        return {
            route: {}
        }
    },
    async created() {
        this.route = await mainService.getRoute();
    }
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
