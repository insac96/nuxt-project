<template>
    <v-sheet class="d-flex justify-center" color="transparent">
        <v-slide-group centered show-arrows>
            <v-slide-item
                v-for="(company, i) in companyes" :key="i"
            >   
                <v-card class="mx-1 rounded-xl" flat outlined :width="width">
                    <v-img class="mx-auto" :src="company.logo" max-width="100%"></v-img>
                </v-card>
            </v-slide-item>
        </v-slide-group>
    </v-sheet>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';

export default {
    props: ['companyes'],

    computed: {
        width () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 80
                case 'sm': return 100
                case 'md': return 110
                case 'lg': return 120
                case 'xl': return 130
            }
        },
    }
}
</script>