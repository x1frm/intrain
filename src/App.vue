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
    height: 100%;
}

@media screen and (min-width: 600px) {
    #app {
        width: 600px;
        border: 2px solid black;
        margin: 20px auto;
        height: calc(100vh - 44px);
        width: calc((100vh - 44px) / 1.77);
    }
}
</style>
