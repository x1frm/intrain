<template>
    <div class="controls">
        <div class="buttons">
            <i class="fas fa-backward" @click="seekAudio(-5)"></i>
            <i class="fas fa-step-backward" @click="changeStop(-1)"></i>
            <i class="fas" :class="paused ? 'fa-play' : 'fa-pause'" @click="playPause()"></i>
            <i class="fas fa-step-forward" @click="changeStop(1)"></i>
            <i class="fas fa-forward" @click="seekAudio(5)"></i>
        </div>

        <audio :src="`assets/audio/${currentStop + 2}.ogg`" ref="audio" type="audio/ogg" />
    </div>
</template>

<script>
import { EventBus } from '@/main.js';

export default {
    name: 'Controls',
    props: {
        currentStop: Number,
        stops: Array
    },
    data() {
        return {
            paused: true,
        }
    },
    watch: {
        currentStop() {
            !this.paused && this.currentStop < this.stops.length && this.playAudio();
        }
    },
    mounted() {
        this.playAudio();
        this.$refs.audio.addEventListener('ended', () => this.paused = true);
    },
    methods: {
        seekAudio(sec) {
            this.$refs.audio.currentTime += sec;
            
            const direction = sec > 0 ? 'вперед' : 'назад';
            EventBus.$emit('notificate', `${Math.abs(sec)} секунд ${direction}`);
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
        user-select: none;

        i {
            margin: 0 8px;
            cursor: pointer;
            user-select: none;
            color: $secondary;

            &:hover {
                opacity: 0.8;
            }

            &:active {
                position: relative;
                top: 1px;
                left: 2px;
            }

            &.disabled {
                color: $gray;
            }
        }
    }
</style>