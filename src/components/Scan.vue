<template>
    <div class="scan">
        <p>Наведите камеру на QR-код в поезде</p>
        <div class="video-container">
            <video ref="video" autoplay :class="{ 'has-border': codeLoaded }">
            </video>
            <div v-show="codeLoaded && !routeLoaded" class="loader"></div>
        </div>
        <div v-if="routeLoaded" class="route-info">
            <p>
                {{ `${route.stops[0].title} - ${route.stops[route.stops.length - 1].title}` }}
                <br><br>
                {{ `Вы находитесь на станции ${route.stops[route.userFirstStop].title}` }}
            </p>
            <v-btn
                text
                @click="$emit('route-loaded', route)"
                class="main-btn"
            >
                Продолжить
            </v-btn>
        </div>
        <div v-else class="route-info"></div>
    </div>
</template>

<script>
import mainService from '@/services/main.service';

export default {
    name: 'Scan',
    data() {
        return {
            codeLoaded: false,
            route: {},
            routeLoaded: false
        }
    },
    mounted() {
        const video = this.$refs.video;

        const constraints = {
            video: {
                height: {
                    min: 640,
                    ideal: 640,
                    max: 640,
                },
                width: {
                    min: 640,
                    ideal: 640,
                    max: 640
                },
                facingMode: {
                    ideal: 'environment'
                }
            }
        };

        const getCameraSelection = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            const rearCamera = videoDevices.find(device => device.label.includes('rear') ||
                device.label.includes('back') ||
                device.label.includes('Rear') ||
                device.label.includes('Back')) || videoDevices[0];

            if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
                const updatedConstraints = {
                    ...constraints,
                    deviceId: {
                        exact: rearCamera.deviceId
                    }
                };

                startStream(updatedConstraints);
            }
        };

        const startStream = async constraints => {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            handleStream(stream);
        };

        const handleStream = stream => {
            video.srcObject = stream;
            setTimeout(this.onCodeLoad, 5000);
        };

        getCameraSelection();
    },
    methods: {
        onCodeLoad() {
            this.codeLoaded = true;
            this.$refs.video.pause();
            setTimeout(this.loadRoute, 2000);
        },
        async loadRoute() {
            this.route = await mainService.getRoute();
            this.routeLoaded = true;
        }
    }
}
</script>

<style lang="scss" scoped>
    .scan {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 100%;
    }

    .video-container {
        max-width: 80%;
        max-height: 40%;
        position: relative;
        margin: 16px;
    }

    video {
        max-width: 100%;
        max-height: 100%;

        &.has-border {
            border: 3px solid lightgreen;
        }
    }

    .main-btn {
        margin: auto 0 24px;
    }

    .route-info {
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
    }
</style>