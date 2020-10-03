<template>
    <div class="player">
        <Header :time="time" :routeName="route.title" />
        <StationsList :stops="route.stops" :currentStop="currentStop" @change-stop="changeStop" />
        <GIFViewer :currentStop="currentStop" />
        <Controls :currentStop="currentStop" />
    </div>
</template>

<script>
import Header from './components/Header';
import StationsList from './components/StationsList';
import GIFViewer from './components/GIFViewer';
import Controls from './components/Controls';

export default {
    name: 'Player',
    components: {
        Header,
        StationsList,
        GIFViewer,
        Controls
    },
    props: {
        route: Object
    },
    data() {
        return {
            time: new Date,
            timeUpdateInterval: 1000,
            manualMode: false,
            manualModeStop: 0
        }
    },
    computed: {
        currentStop() {
            return this.manualMode ?
                this.manualModeStop :
                this.route.stops && this.route.stops.findIndex(el => el.time - this.timeUpdateInterval > this.time.getTime()) - 1;
        }
    },
    mounted() {
        this.getTime();
    },
    methods: {
        getTime() {
            setTimeout(this.getTime, this.timeUpdateInterval);
            this.time = new Date;
        },
        changeStop(idx) {
            this.manualMode = true;
            this.manualModeStop = idx;
        }
    }
}
</script>