<template>
    <v-app>
        <div id="intrain">
            <button v-if="!loggedIn" @click="login">
                press x to win
            </button>
            <Player v-else :route="route" id="player" />
        </div>
    </v-app>
</template>

<script>
import Player from './Player';
import mainService from './services/main.service';
import { EventBus } from '@/main.js';

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
        EventBus.$on('logout', this.logout);

        this.route = await mainService.getRoute();
    },
    methods: {
        login() {
            this.loggedIn = true;
        },
        logout() {
            this.loggedIn = false;
        }
    }
};
</script>

<style lang="scss">
html, body {
    height: 100%;
    margin: 0;
}

#intrain {
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

.main-btn {
    color: $main !important;
}

@media screen and (min-width: 600px) {
    #intrain {
        width: 600px;
        border: 2px solid black;
        margin: 20px auto;
        height: calc(100vh - 44px);
        width: calc((100vh - 44px) / 1.77);
    }
}
</style>
