<template>
    <div class="welcome">
        <img src="/assets/logo.png" height="40">

        <div class="title">
            Сделайте поездку на электричке интереснее!
        </div>

        <div class="feature">
            <div class="icon">
                <i class="fas fa-subway"></i>
            </div>
            <div class="text">
                Пока электричка едет, слушайте истории про место, которое пролетает за окном
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
                Жмите на название станции или кнопки снизу экрана
            </div>
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

<style lang="scss" scoped>
    .welcome {
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    .title {
        margin: 16px;
    }

    .feature {
        margin: 8px 32px;
        display: flex;
        align-items: center;
        text-align: left;
        align-self: baseline;
        justify-content: flex-start;
        height: 80px;

        .icon {
            margin-right: 24px;
            min-width: 26px;
        }

        i {
            color: $main;
            font-size: 1.4em;
        }
    }

    .main-btn {
        margin: auto 0 24px;
    }
</style>