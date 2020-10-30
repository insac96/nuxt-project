<template>
    <v-app class="Guest_Layout">
        <GLayoutHeader></GLayoutHeader>

        <v-main>
            <v-row no-gutters justify="center">
                <div class="Screen">
                    <nuxt></nuxt>
                </div>
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
            titleTemplate: 'ThinkPro',
            title: 'ThinkPro',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
            ],
        }
    }
}
</script>
