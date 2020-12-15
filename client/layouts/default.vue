<template>
    <!--Layout Default-->

    <v-app>
        <!--Header-->
        <GLayoutHeader></GLayoutHeader>

        <!--Main-->
        <v-main>
            <v-row no-gutters justify="center">
                <v-container class="Screen pa-0">
                    <nuxt keep-alive :keep-alive-props="{ max: 10 }"></nuxt>
                </v-container>
            </v-row>
        </v-main>
        
        <!--Cart Button-->
        <client-only>
            <GLaptopCart></GLaptopCart>
        </client-only>

        <!--Dialog Status-->
        <PDialogStatus></PDialogStatus>
    </v-app>
</template>

<script>
export default {
    head() {
        return {
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'}
            ],
        }
    }
}
</script>
