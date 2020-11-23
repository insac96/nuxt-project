<template>
    <v-app>
        <GLayoutHeader></GLayoutHeader>

        <v-main>
            <v-row no-gutters justify="center">
                <v-container class="Screen pa-0">
                    <nuxt keep-alive></nuxt>
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
            title: 'Anio',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
            ],
        }
    }
}
</script>
