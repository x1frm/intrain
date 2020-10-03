<template>
    <div class="stations">
        <div v-for="(stop, idx) in stops"
            :key="stop.title"
            @click="onStopClick(idx)"
            class="stop"
            :class="idx === currentStop && 'active'">
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
        async currentStop(newVal) {
            await this.$nextTick();
            this.$el.scrollTo(0, newVal * 40 - 80);
        }
    },
    methods: {
        formatTime(unix) {
            return (new Date(unix)).toLocaleTimeString('ru-RU').slice(0, 5);
        },
        onStopClick(idx) {
            this.$emit('change-stop', idx);
        }
    }
}
</script>

<style lang="scss" scoped>
    .stations {
        height: 200px;
        overflow: auto;
        margin: 4px 16px;
    }

    .stop {
        display: flex;
        align-items: center;
        height: 40px;
        cursor: pointer;

        &::before {
            content: '';
            border-radius: 100%;
            background-color: $main;
            width: 15px;
            height: 15px;
            margin-right: 8px;
        }

        &.active::before {
            background-color: red;
        }
    }

    .time {
        margin-left: auto;
    }
</style>