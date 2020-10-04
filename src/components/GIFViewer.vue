<template>
    <div class="gifs">
        <img :src="gifSrc" />
    </div>
</template>

<script>
export default {
    name: 'GIFViewer',
    props: {
        currentStop: Number
    },
    computed: {
        gifSrc() {
            return '/assets/gif/' +  (this.currentStop % 18 + 1) + '.gif';
        }
    }
}
</script>

<style lang="scss" scoped>
    .gifs {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        max-width: 90%;
    }
</style>