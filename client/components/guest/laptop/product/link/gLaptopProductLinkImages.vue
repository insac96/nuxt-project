<template>
    <!--g_laptop_product_link_images-->

    <v-card flat tile class="Sticky_Top Sticky_Top--xl">
        <v-card-text v-if="images.length < 1">
            <v-alert type="info">Sản Phẩm Chưa Có Hình Ảnh</v-alert>
        </v-card-text>

        <!--One Image-->
        <v-card-text v-else-if="images.length == 1">
            <v-img :src="images[0]" :aspect-ratio="1.5" contain>
                <template v-slot:placeholder>
                    <v-sheet width="100%" height="100%" color="card" class="d-flex justify-center align-center">
                        <v-progress-circular
                            indeterminate
                            color="primary"
                        ></v-progress-circular>
                    </v-sheet>
                </template>
            </v-img>
        </v-card-text>
        
        <!--Many Image-->
        <v-card-text v-else class="pa-0 pa-sm-4">
            <!--Slide Show-->
            <LazyHydrate when-idle>
                <v-carousel
                    v-model="ImageNow"
                    cycle height="auto"
                    :show-arrows-on-hover="ShowArrows"
                    hide-delimiter-background
                >
                    <v-carousel-item v-for="item in images" :key="item">
                        <v-img :src="item" :aspect-ratio="1.5" contain>
                            <!--Lazy Load-->
                            <template v-slot:placeholder>
                                <v-sheet width="100%" height="100%" color="card" class="d-flex justify-center align-center">
                                    <v-progress-circular
                                        indeterminate
                                        color="primary"
                                    ></v-progress-circular>
                                </v-sheet>
                            </template>
                        </v-img>
                    </v-carousel-item>
                </v-carousel>
            </LazyHydrate>

            <!--Mini List-->
            <v-sheet class="mt-4 d-none d-sm-block">
                <LazyHydrate when-idle>
                    <v-slide-group show-arrows center-active>
                        <v-slide-item v-for="(item, i) in images" :key="i" class="mr-1">
                            <v-card flat class="rounded-lg" :ripple="false" @click="ImageNow = i">
                                <v-img :src="item" width="90" max-width="90"></v-img>
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                </LazyHydrate>
            </v-sheet>
            
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['images'],

    data () {
        return {
            ImageNow: 0
        }
    },

    computed: {
        ShowArrows () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return false
                case 'sm': return true
                case 'md': return true
                case 'lg': return true
                case 'xl': return true
            }
        },
    }
}
</script>