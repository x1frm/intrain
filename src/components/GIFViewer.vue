<template>
    <div class="gifs">
        <div v-show="isLoading && currentStop !== -1" class="loader"></div>
        <video v-show="!isLoading" ref="video" :src="gifSrc" type="video/mp4" loop playsinline muted webkit-playsinline autoplay>
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
            return 'assets/gif/' +  (this.currentStop + 1) + '.mp4';
        }
    },
    mounted() {
        const video = this.$refs.video;
        video.addEventListener('loadedmetadata', () => {
            this.isLoading = false;
            video.play();
        }, false);
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
