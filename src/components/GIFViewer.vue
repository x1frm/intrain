<template>
    <div class="gifs">
        <div v-show="isLoading" class="loader"></div>
        <img v-show="!isLoading" :src="gifSrc" ref="img" />
    </div>
</template>

<script>
export default {
    name: 'GIFViewer',
    props: {
        currentStop: Number
    },
    data() {
        return {
            isLoading: true
        }
    },
    computed: {
        gifSrc() {
            return '/assets/gif/' +  (this.currentStop % 18 + 1) + '.gif';
        }
    },
    mounted() {
        const img = this.$refs.img;
        img.onload = () => {
            this.isLoading = false;
        }
    },
    watch: {
        currentStop() {
            this.isLoading = true;
        }
    }
}
</script>

<style lang="scss" scoped>
    .gifs {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    img {
        max-width: 90%;
    }
</style>
