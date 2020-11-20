<template>
    <div class="welcome">
        <img src="assets/logo.png" class="main-logo">

        <div class="carousel-container">

            <v-carousel :show-arrows="false"
                v-model="slide"
                @change="onSlideChange"
                hide-delimiter-background
                height="100%"
                light>
                <v-carousel-item>
                    <div class="theather-info">
                        Привет! 
                        <br>
                        Вы попали в спектакль по мотивам романа Венедикта Ерофеева который должен происходить в электричке по одноименному маршруту. Мы рекомендуем начать слушать его в электричке прямо на Курском вокзале за 6 минут до отправления. 
                        <br><br>
                        Конечно, вы можете послушать и дома, но такого кайфа не будет. Смотрите по сторонам, смотрите на людей вокруг, но старайтесь не снимать защитной маски. 
                        <br><br>
                        Листайте далее, чтобы посмотреть инструкцию.
                    </div>
                </v-carousel-item>

                <v-carousel-item>
                    <div class="app-info">
                        <div class="feature">
                            <div class="icon">
                                <i class="fas fa-subway"></i>
                            </div>
                            <div class="text">
                                Пока электричка едет, слушайте истории  в привязке к ж/д станциям.
                            </div>
                        </div>

                        <div class="feature">
                            <div class="icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="text">
                                Приложение синхронизируется с расписанием по вашему маршруту и нужная история включится автоматически
                            </div>
                        </div>

                        <div class="feature">
                            <div class="icon">
                                <i class="fas fa-volume-up"></i>
                            </div>
                            <div class="text">
                                Если электричка отклоняется от расписания - можно управлять воспроизведением вручную
                            </div>
                        </div>

                        <div class="feature">
                            <div class="icon">
                                <i class="fas fa-step-forward"></i>
                            </div>
                            <div class="text">
                                Жмите на название станции или кнопки снизу экрана, чтобы перейти к станции.
                            </div>
                        </div>

                        <div class="feature">
                            <div class="icon">
                                <i class="fas fa-space-shuttle"></i>
                            </div>
                            <div class="text">
                                Жмите на кнопку <i class="fas fa-forward"></i>, чтобы промотать на 5 секунд вперед или назад. 
                            </div>
                        </div>
                    </div>
                </v-carousel-item>

                <div v-if="showScrollBtn"
                    @click="scroll()"
                    class="scroll-down"
                    :class="{ 'disabled': !isScrollEnabled }">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </v-carousel>
        </div>

        <v-btn
            text
            @click="$emit('close')"
            class="main-btn"
        >
            Понятно
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'Welcome',
    data() {
        return {
            slide: 0,
            showScrollBtn: false,
            isScrollEnabled: true,
            slidesWithScrollListeners: []
        };
    },
    async mounted() {
        await this.$nextTick();
        this.getScrollBtnExistence();

        this.addScrollListener(0);
    },
    methods: {
        async getScrollBtnExistence() {
            await this.$nextTick();
            setTimeout(() => {
                const all = document.querySelectorAll('.v-carousel__item');
                const element = document.querySelectorAll('.v-carousel__item')[this.slide];
                this.showScrollBtn = element.scrollHeight > element.clientHeight + 10;
            }, 0);
        },
        onSlideChange(number) {
            this.getScrollBtnExistence();
            setTimeout(() => {
                this.addScrollListener(number);
                this.checkIfScrollEnabled();
            }, 0);
        },
        scroll() {
            if (!this.isScrollEnabled) return;
            const element = document.querySelectorAll('.v-carousel__item')[this.slide];
            const scrollAmount = element.clientHeight - 50;
            element.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        },
        checkIfScrollEnabled() {
            const element = document.querySelectorAll('.v-carousel__item')[this.slide];
            this.isScrollEnabled = element.clientHeight + element.scrollTop < element.scrollHeight;
        },
        addScrollListener(slideNumber) {
            const slides = document.querySelectorAll('.v-carousel__item');
            if (!slides[slideNumber]) {
                console.error('Cannot find a slide to add scroll!');
                return;
            };

            if (this.slidesWithScrollListeners.includes(slideNumber)) return;
            this.slidesWithScrollListeners.push(slideNumber);

            let ticking = false;

            slides[slideNumber].addEventListener('scroll', () => {

                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        this.checkIfScrollEnabled();
                        ticking = false;
                    });

                    ticking = true;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .welcome {
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    .main-logo {
        max-width: 100%;
    }

    .app-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        color: $text-color;
    }

    .carousel-container {
        flex: auto;
        overflow: auto;
        margin: 16px 0 0;
    }

    .feature {
        margin: 8px 32px;
        display: flex;
        align-items: center;
        text-align: left;
        align-self: baseline;
        justify-content: flex-start;

        .icon {
            margin-right: 24px;
            min-width: 26px;

            i {
                color: $main;
                font-size: 1.4em;
            }
        }

        .text i {
            font-size: 12px;
        }
    }

    .main-btn {
        margin: auto 0 0;
    }

    .theather-info {
        display: flex;
        margin: auto;
    }

    .scroll-down {
        margin-top: 12px;
        cursor: pointer;

        &.disabled {
            color: $gray;
        }
    }
</style>

<style lang="scss">
    .welcome {
        .v-window__container {
            height: calc(100% - 50px) !important;
        }

        .v-carousel__item {
            overflow: auto;
        }

        .v-window-item {
            height: calc(100% - 36px) !important;
        }
    }
</style>