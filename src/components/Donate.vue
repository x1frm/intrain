<template>
    <div>
        <v-dialog
            v-model="show"
            persistent
            max-width="400"
        >
            <v-card justify="center">
                <v-card-title class="headline">
                    <img src="/assets/logo.png" height="40">
                </v-card-title>

                <div class="donate-image">
                    <img src="/assets/donate1.jpg" />
                </div>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        @click="openSubDialog()"
                        class="main-btn"
                    >
                        Прочитать
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="showSubDialog"
            persistent
            max-width="400"
        >
            <v-card justify="center">
                <v-card-title class="headline">
                    <img src="/assets/logo.png" height="40">
                </v-card-title>

                <div class="donate-image">
                    <img src="/assets/donate2.png" />
                </div>

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
                        @click="logout()"
                        color="red"
                    >
                        Не дать
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { EventBus } from '@/main.js'

export default {
    name: 'Donate',
    props: {
        show: Boolean,
    },
    data() {
        return {
            showSubDialog: false
        }
    },
    methods: {
        logout() {
            EventBus.$emit('logout');
        },
        openSubDialog() {
            this.$emit('close');
            this.showSubDialog = true;
        }
    }
}
</script>

<style lang="scss" scoped>
    img {
        max-width: 90%;
    }

    .donate-image {
        text-align: center;
        margin: 8px 0;
    }

    .headline {
        justify-content: center;
    }
</style>
