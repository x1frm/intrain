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

    .loader {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        width: 50px;
        height: 50px;
        margin: -25px 0 0 -25px;
        border: 8px solid #f3f3f3;
        border-radius: 50%;
        border-top: 8px solid $main;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
    }

    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>