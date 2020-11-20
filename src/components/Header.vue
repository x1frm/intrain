<template>
    <div class="header">
        
        <v-dialog
            v-model="dialog"
            persistent
            max-width="400"
        >
            <template v-slot:activator="{ on, attrs }">
                <i class="far fa-question-circle about"
                    v-bind="attrs"
                    v-on="on"></i>
            </template>
            <v-card justify="center">
                <v-card-title class="headline">
                    <img src="assets/logo.png" class="main-logo">
                </v-card-title>

                <v-card-text class="about-text">
                    <div class="justify">
                        У нас тоже много вопросов о том, что это такое. Если у вас есть предложения, замечания или слова благодарности, то пишите их  в телеграм бота @moskva-petushki или на почту
                        <a href="mailto:m-p@taeg.pro">m-p@taeg.pro</a>.
                    </div>

                    <br><br><strong>Спектакль создавали:</strong><br>

                    Режиссер: Дмитрий Крестьянкин<br>
                    Продюсер: Егор Татаренко<br>
                    Музыкальный руководитель: Даниил Посаженников<br>
                    Сайт: Александр Швец<br>
                    Дизайн: Алена Пылаева<br>
                    <strong>ВЕНЯ 1</strong><br>
                    Веня:  Александр Манько<br>
                    Ангелы: Анастасия Мощенко и Кристина Веденеева<br>
                    <strong>ВЕНЯ 2</strong><br>
                    Веня:  Александр Манько<br>
                    Ангелы: Анастасия Мощенко и Кристина Веденеева<br>
                    <strong>ВЕНЯ 3</strong> <br>
                    Веня:  Александр Манько<br>
                    Ангелы: Анастасия Мощенко и Кристина Веденеева<br>
                    <strong>ВЕНЯ 4</strong> <br>
                    Веня:  Александр Манько<br>
                    Ангелы: Анастасия Мощенко и Кристина Веденеева
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn
                        text
                        @click="dialog = false"
                        class="main-btn"
                    >
                        Понятно
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div class="route-name">
            МОСКВА - ПЕТУШКИ
        </div>
        <div class="time">
            {{ time.toLocaleTimeString('ru-RU').slice(0, 5) }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        routeName: String,
        time: Date
    },
    data() {
        return {
            dialog: false
        }
    }
}
</script>

<style lang="scss" scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $main;
        color: #ffffff;
        text-transform: uppercase;
        padding: 0 8px;
        height: $top-bar-height;
        font-size: 16px;
    }

    .main-logo {
        max-width: 100%;
    }

    .about {
        cursor: pointer;
        width: 50px;
        text-align: left;
        font-size: 24px;
    }

    .route-name {
        margin: 0 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .time {
        width: 50px;
        text-align: right;
    }

    .justify {
        text-align: justify;
    }

    .headline {
        justify-content: center;
    }
</style>