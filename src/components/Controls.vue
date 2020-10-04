<template>
    <div class="controls">
        <div class="buttons">
            <i class="fas fa-backward" @click="seekAudio(-5)"></i>
            <i class="fas fa-step-backward" @click="changeStop(-1)"></i>
            <i class="fas" :class="paused ? 'fa-play' : 'fa-pause'" @click="playPause()"></i>
            <i class="fas fa-step-forward" @click="changeStop(1)"></i>
            <i class="fas fa-forward" @click="seekAudio(5)"></i>
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
            paused: true
        }
    },
    watch: {
        currentStop() {
            !this.paused && this.playAudio();
        }
    },
    mounted() {
        this.playAudio();
    },
    methods: {
        seekAudio(sec) {
            this.$refs.audio.currentTime += sec;
        },
        playPause() {
            this.paused ? this.$refs.audio.play() : this.$refs.audio.pause();
            this.paused = !this.paused;
        },
        changeStop(delta) {
            this.$emit('change-stop', this.currentStop + delta);
        },
        async playAudio() {
            await this.$nextTick();
            this.$refs.audio.play();
            this.paused = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .buttons {
        font-size: 2em;

        i {
            margin: 0 4px;
            cursor: pointer;
        }
    }
</style>