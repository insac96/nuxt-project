<template>
    <v-app class="Guest_Layout">
        <GLayoutHeader></GLayoutHeader>

        <v-main>
            <v-row no-gutters justify="center">
                <nuxt></nuxt>
            </v-row>
        </v-main>
    </v-app>
</template>

<script>
import '@/assets/guest.scss';

export default {
    name: 'guest',

    head() {
        return {
            titleTemplate: 'Anio',
            title: 'Anio',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
            ],
        }
    }
}
</script>
