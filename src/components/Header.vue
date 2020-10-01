<template>
    <div class="header">
        <i class="far fa-question-circle about"></i>
        <div class="route-name">
            {{ routeName }}
        </div>
        <div class="time">
            {{ time.toLocaleTimeString('ru-RU') }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        routeName: String,
        time: Date
    }
}
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $main;
        color: #ffffff;
        text-transform: uppercase;
        padding: 0 8px;
        height: $top-bar-height;
    }

    .about {
        cursor: pointer;
        width: 80px;
        text-align: left;
    }

    .route-name {
        margin: 0 16px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .time {
        width: 80px;
        text-align: right;
    }
</style>