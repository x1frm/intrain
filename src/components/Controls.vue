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
        <div class="message" :class="showMessage && 'show'">
            {{ message }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Controls',
    props: {
        currentStop: Number,
        stops: Array
    },
    data() {
        return {
            paused: true,
            message: '',
            showMessage: false,
            timer: 0
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
            
            const direction = sec > 0 ? 'вперед' : 'назад';
            clearTimeout(this.timer);
            this.message = `${Math.abs(sec)} секунд ${direction}`;
            this.showMessage = true;
            this.timer = setTimeout(() => this.showMessage = false, 2000);
        },
        playPause() {
            this.paused ? this.$refs.audio.play() : this.$refs.audio.pause();
            this.paused = !this.paused;
        },
        changeStop(delta) {
            this.$emit('change-stop', this.currentStop + delta);

            const stopName = this.stops[this.currentStop + delta].title;
            clearTimeout(this.timer);
            this.message = `Станция ${stopName}`;
            this.showMessage = true;
            this.timer = setTimeout(() => this.showMessage = false, 2000);
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
        font-size: 3em;
        user-select: none;

        i {
            margin: 0 8px;
            cursor: pointer;
            user-select: none;

            &:hover {
                opacity: 0.8;
            }

            &:active {
                position: relative;
                top: 1px;
                left: 2px;
            }
        }
    }

    .message {
        padding: 8px 16px;
        background-color: gray;
        border-radius: 8px;
        position: fixed;
        left: 50%;
        top: 100px;
        transform: translate(-50%, -50%);
        opacity: 0;
        color: #f4f4f4;
        transition: opacity 3s ease;

        &.show {
            opacity: 0.8;
            transition: opacity 1s ease;
        }
    }
</style>