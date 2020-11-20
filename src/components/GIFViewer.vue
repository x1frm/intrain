<template>
    <div class="gifs">
        <div v-show="isLoading" class="loader"></div>
        <video v-show="!isLoading" ref="video" :src="gifSrc" type="video/mp4" loop>
            <!-- <source :src="gifSrc" type="video/mp4"> -->
        </video>
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
            return '/assets/gif/' +  (this.currentStop + 1) + '.mp4';
        }
    },
    mounted() {
        const video = this.$refs.video;
        video.onloadeddata = () => {
            this.isLoading = false;
            video.play();
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

    video {
        max-width: 90%;
    }
</style>
