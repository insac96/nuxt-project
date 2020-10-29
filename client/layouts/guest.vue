<template>
    <v-app class="Guest_Layout">
        <GLayoutHeader></GLayoutHeader>

        <v-main>
            <v-container class="pa-0">
                <v-row no-gutters justify="center">
                    <v-col cols="12" lg="10" xl="8">
                        <nuxt />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import '@/assets/guest.scss';

export default {
    name: 'guest',

    head() {
        return {
            titleTemplate: 'ThinkPro',
            title: 'ThinkPro',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ],
        }
    }
}
</script>
