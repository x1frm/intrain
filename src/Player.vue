<template>
    <div class="player">
        <Header :time="time" :routeName="route.title" />
        <StationsList :stops="route.stops" :currentStop="currentStop" />
    </div>
</template>

<script>
import Header from './components/Header';
import StationsList from './components/StationsList';

export default {
    name: 'Player',
    components: {
        Header,
        StationsList
    },
    props: {
        route: Object
    },
    data() {
        return {
            time: new Date,
            timeUpdateInterval: 1000
        }
    },
    computed: {
        currentStop() {
            return this.route.stops && this.route.stops.findIndex(el => el.time - this.timeUpdateInterval > this.time.getTime()) - 1;
        }
    },
    mounted() {
        this.getTime();
    },
    methods: {
        getTime() {
            setTimeout(this.getTime, this.timeUpdateInterval);
            this.time = new Date;
        }
    }
}
</script>