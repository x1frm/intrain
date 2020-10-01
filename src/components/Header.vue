<template>
    <div class="header">
        <i class="far fa-question-circle about"></i>
        <div class="route-name">
            {{ routeName }}
        </div>
        <div class="time">
            {{ time }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        routeName: String,
        time: String
    }
}
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        justify-content: space-between;
        background-color: $main;
        color: #ffffff;
        text-transform: uppercase;
        padding: 4px 8px;
    }

    .about {
        cursor: pointer;
    }
</style>