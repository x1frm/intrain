<template>
    <v-app>
        <div id="intrain">
            <Welcome v-if="showWelcome" @close="showWelcome = false" />
            <Scan v-else-if="!loggedIn" @route-loaded="onRouteLoad" />
            <Player v-else :route="route" id="player" />

            <div class="message" :class="showMessage && 'show'">
                {{ message }}
            </div>
        </div>
    </v-app>
</template>

<script>
import Player from './Player';
import mainService from './services/main.service';
import Welcome from './components/Welcome';
import { EventBus } from '@/main.js';
import Scan from './components/Scan';

export default {
    name: 'App',
    components: {
        Player,
        Welcome,
        Scan
    },
    data() {
        return {
            route: {},
            loggedIn: false,
            message: '',
            showMessage: false,
            timer: 0,
            showWelcome: true
        }
    },
    created() {
        EventBus.$on('logout', this.logout);
    },
    mounted() {
        EventBus.$on('notificate', msg => {
            clearTimeout(this.timer);
            this.message = msg;
            this.showMessage = true;
            this.timer = setTimeout(() => this.showMessage = false, 2000);
        });


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
        },
        onRouteLoad(route) {
            this.route = route;
            this.login();
        }
    }
};
</script>

<style lang="scss">
html, body, #app, #intrain, #player, .v-application--wrap {
    height: 100% !important;
    min-height: unset !important;
    margin: 0;
}

#intrain {
    font-family: Roboto, sans-serif;
    text-align: center;
    color: #2c3e50;
    height: 100%;
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

.loader {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 50px;
    height: 50px;
    margin: -25px 0 0 -25px;
    border: 8px solid #f3f3f3;
    border-radius: 50%;
    border-top: 8px solid $main;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>

<style lang="scss" scoped>
    .message {
        padding: 8px 16px;
        background-color: gray;
        border-radius: 8px;
        position: fixed;
        left: 50%;
        top: 50px;
        transform: translate(-50%, -50%);
        opacity: 0;
        color: #f4f4f4;
        transition: opacity 3s ease;

        @media screen and (min-width: 600px) {
            top: 100px;
        }

        &.show {
            opacity: 0.8;
            transition: opacity 1s ease;
        }
    }
</style>