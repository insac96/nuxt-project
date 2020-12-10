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
