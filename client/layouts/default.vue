<template>
    <v-app>
        <GLayoutHeader></GLayoutHeader>

        <v-main>
            <v-row no-gutters justify="center">
                <v-container class="Screen pa-0">
                    <nuxt keep-alive :keep-alive-props="{ max: 10 }"></nuxt>
                </v-container>
            </v-row>
        </v-main>

        <client-only>
            <GLaptopCart></GLaptopCart>
        </client-only>

        <v-dialog v-model="Dialog" max-width="300" persistent>
            <v-card>
                <div class="d-flex justify-center py-4">
                    <v-avatar size="100" color="primary">
                        <v-icon size="100" color="white">sentiment_very_satisfied</v-icon>
                    </v-avatar>
                </div>

                <div class="text-center px-4 text-h6">
                    Chào <strong>Tina</strong>, cảm ơn e đã ghé thăm trang web của anh trai YÊUUUUUUUU nhé :)))))
                </div>

                <v-card-actions class="justify-center py-4">
                    <v-btn rounded elevation="0" @click="Dialog = false">Bắt Đầu Nào</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
export default {
    head() {
        return {
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
                { name: 'google-site-verification', content: 'x6eiS9dZrpRj2TGxFTFlqbY_OtfOjAl3WtNvgfvMMcs'},
            ],
        }
    },

    data () {
        return {
            Dialog: true
        }
    }
}
</script>
