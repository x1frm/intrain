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
                    <img src="/assets/logo.png" height="40">
                </v-card-title>

                <div class="about-image">
                    <img src="/assets/about.jpg" height="300" />
                </div>

                <v-card-text class="about-text">
                    "Даже шляпу негде повесить в вашем ёбаном гадюшнике"
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn
                        text
                        href="http://azino-tri-topora.top/"
                        class="main-btn"
                    >
                        Дать ему денег
                    </v-btn>
                    <v-btn
                        text
                        @click="dialog = false"
                        color="red"
                    >
                        Не дать
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div class="route-name">
            {{ routeName }}
        </div>
        <div class="time">
            {{ time.toLocaleTimeString('ru-RU') }}
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
        font-size: 18px;
    }

    .about {
        cursor: pointer;
        width: 80px;
        text-align: left;
        font-size: 24px;
    }

    .route-name {
        margin: 0 16px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .time {
        width: 80px;
        text-align: right;
    }

    .about-image {
        text-align: center;
        margin: 8px 0;
    }

    .about-text {
        font-family: 'Lobster', cursive;
        font-size: 1.6em;
        text-align: center;
        line-height: 1;
    }

    .headline {
        justify-content: center;
    }
</style>