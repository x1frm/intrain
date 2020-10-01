<template>
    <div class="player">
        <Header :time="time" :routeName="route.title" />
    </div>
</template>

<script>
import Header from './components/Header';

export default {
    name: 'Player',
    components: {
        Header
    },
    props: {
        route: Object
    },
    data() {
        return {
            time: ''
        }
    },
    mounted() {
        this.getTime();
    },
    methods: {
        getTime() {
            setTimeout(this.getTime, 1000);
            this.time = (new Date).toLocaleTimeString('ru-RU');
        }
    }
}
</script>