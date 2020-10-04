<template>
    <div id="app">
        <button v-if="!loggedIn" @click="login">
            press x to win
        </button>
        <Player v-else :route="route" id="player" />
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
            route: {},
            loggedIn: false
        }
    },
    async created() {
        this.route = await mainService.getRoute();
    },
    methods: {
        login() {
            this.loggedIn = true;
        }
    }
};
</script>

<style lang="scss">
html, body {
    height: 100%;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}

#player {
    height: calc(100% - #{$top-bar-height});
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
