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
    mounted() {
        let touchstartX = 0;
        let touchstartY = 0;
        let touchendX = 0;
        let touchendY = 0;

        const gestureZone = document.getElementById('intrain');

        const handleGesture = () => {
            const { width, height } = gestureZone.getBoundingClientRect();

            const ratio_horizontal = (touchendX - touchstartX) / width;
            const ratio_vertical = (touchendY - touchstartY) / height;

            if (ratio_horizontal > ratio_vertical && ratio_horizontal > 0.25) {
                EventBus.$emit('swipe-right');
            }
            if (ratio_vertical > ratio_horizontal && ratio_vertical > 0.25) {
                EventBus.$emit('swipe-down');
            }
            if (ratio_horizontal < ratio_vertical && ratio_horizontal < -0.25) {
                EventBus.$emit('swipe-left');
            }
            if (ratio_vertical < ratio_horizontal && ratio_vertical < -0.25) {
                EventBus.$emit('swipe-up');
            }

            return false;
        }

        gestureZone.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, false);

        gestureZone.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleGesture();
        }, false); 
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
