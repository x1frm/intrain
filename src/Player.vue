<template>
    <div class="player">
        <Header :time="time" :routeName="route.title" />
        <StationsList :stops="route.stops"
            :currentStop="currentStop"
            @change-stop="changeStop"
            :isDefaultRoute="isDefaultRoute"
        />
        <GIFViewer :currentStop="currentStop" class="gifs" />
        <Controls :currentStop="currentStop" @change-stop="changeStop" :stops="route.stops" />
    </div>
</template>

<script>
import Header from './components/Header';
import StationsList from './components/StationsList';
import GIFViewer from './components/GIFViewer';
import Controls from './components/Controls';
import { EventBus } from '@/main';

export default {
    name: 'Player',
    components: {
        Header,
        StationsList,
        GIFViewer,
        Controls
    },
    props: {
        route: Object,
        time: Date,
        timeUpdateInterval: Number,
        isDefaultRoute: Boolean
    },
    data() {
        return {
            manualMode: false,
            manualModeStop: 0
        }
    },
    computed: {
        currentStop() {
            if (this.manualMode) return this.manualModeStop;

            const nextStop = this.route.stops && this.route.stops.findIndex(el => el.departure - this.timeUpdateInterval > this.time.getTime());
            if (nextStop === -1) {
                return this.route.stops[this.route.stops.length - 1].arrival > this.time.getTime() ?
                    this.route.stops.length - 2:
                    this.route.stops.length - 1;
            }
            return nextStop - 1;
        }
    },
    mounted() {
        if (this.isDefaultRoute) {
            this.manualMode = true;
            this.manualModeStop = 0;
        }
        EventBus.$on('swipe-left', () => this.changeStop(this.currentStop + 1));
        EventBus.$on('swipe-right', () => this.changeStop(this.currentStop - 1));
    },
    methods: {
        changeStop(idx) {
            if (idx < 0 || idx >= this.route.stops.length) return;
            this.manualMode = true;
            this.manualModeStop = idx;

            const stopName = this.route.stops[this.currentStop].title;
            EventBus.$emit('notificate', `Станция ${stopName}`);
        }
    }
}
</script>

<style lang="scss" scoped>
    .player {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .gifs {
        flex: auto;
        margin: 8px 0;
    }
</style>