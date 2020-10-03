<template>
    <div class="controls">
        <div class="buttons">
            <i class="fas fa-backward"></i>
            <i class="fas fa-step-backward"></i>
            <i class="fas fa-play"></i>
            <i class="far fa-pause-circle"></i>
            <i class="fas fa-forward"></i>
            <i class="fas fa-step-forward"></i>
        </div>

        <audio :src="`/assets/audio/${currentStop + 1}.mp3`" ref="audio" />
    </div>
</template>

<script>
export default {
    name: 'Controls',
    props: {
        currentStop: Number,
    },
    data() {
        return {
        }
    },
    mounted() {
        document.body.onclick = () => this.$refs.audio.play();
    }
}
</script>