<template>
    <v-app>
        <div id="intrain">
            <Welcome v-if="!loggedIn" @close="login" />
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

export default {
    name: 'App',
    components: {
        Player,
        Welcome
    },
    data() {
        return {
            route: {},
            loggedIn: false,
            message: '',
            showMessage: false,
            timer: 0
        }
    },
    async created() {
        EventBus.$on('logout', this.logout);

        this.route = await mainService.getRoute();
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
        }
    }
};
</script>

<style lang="scss">
html, body, #app, #intrain, #player, .v-application--wrap {
    height: 100%;
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
</style>

<style lang="scss" scoped>
    .message {
        padding: 8px 16px;
        background-color: gray;
        border-radius: 8px;
        position: fixed;
        left: 50%;
        top: 100px;
        transform: translate(-50%, -50%);
        opacity: 0;
        color: #f4f4f4;
        transition: opacity 3s ease;

        &.show {
            opacity: 0.8;
            transition: opacity 1s ease;
        }
    }
</style>