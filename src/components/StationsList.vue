<template>
    <div class="stations">
        <div v-for="(stop, idx) in stops"
            :key="stop.title"
            @click="onStopClick(idx)"
            class="stop">

            <div class="circle" :class="idx <= currentStop && 'passed'">
                <div v-show="idx === currentStop" class="pulse"></div>
            </div>
            <div class="title">
                {{ stop.title }}
            </div>
            <div class="time">
                {{ formatTime(stop.time) }}
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'StationsList',
    props: {
        stops: Array,
        currentStop: Number
    },
    computed: {
        stopsAmount() {
            return this.stops.length;
        }
    },
    watch: {
        currentStop(newVal) {
            this.scrollToStop(newVal);
        }
    },
    mounted() {
        this.scrollToStop(this.currentStop);
    },
    methods: {
        formatTime(unix) {
            return (new Date(unix)).toLocaleTimeString('ru-RU').slice(0, 5);
        },
        onStopClick(idx) {
            this.$emit('change-stop', idx);
        },
        async scrollToStop(stop) {
            await this.$nextTick();
            this.$el.scrollTo(0, stop * 40 - 80);
        }
    }
}
</script>

<style lang="scss" scoped>
    .stations {
        height: 200px;
        overflow-y: auto;
        padding: 0 16px;
        margin: 4px 0;

        @media screen and (min-width: 600px) {
            -ms-overflow-style: none;
            scrollbar-width: none; 

            &::-webkit-scrollbar {
                display: none;
            }
        }
    }

    .stop {
        display: flex;
        align-items: center;
        height: 40px;
        cursor: pointer;

        .circle {
            content: '';
            border-radius: 100%;
            background-color: $main;
            width: 10px;
            height: 10px;
            margin-right: 8px;
            position: relative;

            &::before {
                content: '';
                position: absolute;
                bottom: 100%;
                left: calc(50% - 1px);
                width: 2px;
                height: 30px;
                z-index: -1;
                background-color: inherit;
            }

            &.passed {
                background-color: red;
            }

            .pulse {
                animation: pulsing 3s ease-out;
                animation-iteration-count: infinite;

                border: 6px solid red;
                background: transparent;
                border-radius: 60px;
                height: 28px;
                width: 28px;
                position: absolute;
                top: -9px;
                left: -9px;
                opacity: 0;
                
                @keyframes pulsing {
                    0% {
                    transform: scale(0);
                    opacity: 0.0;
                    }
                    25% {
                    transform: scale(0);
                    opacity: 0.1;
                    }
                    50% {
                    transform: scale(0.1);
                    opacity: 0.3;
                    }
                    75% {
                    transform: scale(0.5);
                    opacity: 0.5;
                    }
                    100% {
                    transform: scale(1);
                    opacity: 0.0;
                    }
                }
            }
        }

        &:first-child {
            .circle::before {
                display: none;
            }
        }
    }

    .time {
        margin-left: auto;
    }
</style>