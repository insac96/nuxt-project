<template>
    <!--g_laptop_product_variant_new_mini-->

    <v-card flat tile  color="transparent">
        <!--Header-->
        <v-sheet class="d-flex align-center Sticky_Top py-3 px-4 px-md-0" color="background">
            <!--Header Left-->
            <span class="text-h5 text-md-h4 secondary--text">Hàng Mới Về</span>

            <v-spacer></v-spacer>

            <!--Header Right-->
            <div v-if="variants.length > 0">
                <v-btn
                    class="BoxShadow"
                    :disabled="(skip === 0)" 
                    fab :small="!SmallButton" :x-small="SmallButton"
                    @click="Before"
                >
                    <v-icon>navigate_before</v-icon>
                </v-btn>

                <v-btn 
                    class="BoxShadow"
                    :disabled="(skip + variants.length) === (countVariant)"
                    fab :small="!SmallButton" :x-small="SmallButton"
                    @click="Next"
                >
                    <v-icon>navigate_next</v-icon>
                </v-btn>
            </div>
        </v-sheet>

        <!--Fetch Pendding-->
        <v-card-text v-if="$fetchState.pending || $fetchState.error" class="px-4 px-md-0">
            <v-row dense>
                <v-col cols="6" sm="3" class="pa-1 pa-md-2" v-for="i in 4" :key="i">
                    <v-skeleton-loader type="image, article"></v-skeleton-loader>
                </v-col>
            </v-row>

            <v-alert v-if="$fetchState.error" type="error" class="BoxShadow mt-4"> {{$fetchState.error.message}} </v-alert>
        </v-card-text>

        <!--Fetch Done-->
        <v-card-text v-else class="px-4 px-md-0">
            <v-alert type="info" color="primary" class="BoxShadow" v-if="variants.length < 1">Hiện Tại Không Có Sản Phẩm Để Hiển Thị</v-alert>

            <v-row dense align="stretch" v-else>
                <v-col 
                    cols="6" sm="3"
                    class="d-flex child-flex"
                    v-for="(variant, indexVariant) in variants" :key="indexVariant"
                >
                    <v-card 
                        class="d-flex flex-column BoxShadow"
                        :ripple="false"
                        :to="`laptop/product/${variant.product.link}?variant=${variant.code}`"
                    >
                        <!--Image-->
                        <v-img 
                            class="mx-auto" 
                            :src="$Image.Get(variant.product.images[0], 'm')"
                            :alt="variant.name" 
                            width="100%"
                            :aspect-ratio="1.5" contain
                        >
                            <template v-slot:placeholder>
                                <v-sheet width="100%" height="100%" color="card" class="d-flex justify-center align-center">
                                    <v-progress-circular
                                        indeterminate
                                        color="primary"
                                    ></v-progress-circular>
                                </v-sheet>
                            </template>
                        </v-img>
                        
                        <!--Status and Discount Amount-->
                        <div class="d-flex">
                            <v-chip 
                                label color="primary" 
                                class="rounded-0 font-weight-bold px-2 px-md-3 text-caption text-md-subtitle-2"
                            >
                                {{variant.status}}
                            </v-chip>

                            <v-chip
                                v-if="variant.discount.type"
                                label color="error" 
                                class="rounded-0 font-weight-bold px-2 px-md-3 text-caption text-md-subtitle-2"
                            >
                                - {{ $String.toPrice(variant.discount.amount) }}đ
                            </v-chip>
                        </div>

                        <!--Information-->
                        <v-card-text class="py-2 py-md-4">
                            <div
                                class="text-subtitle-1 text-md-h6 font-weight-bold Text-Nowap"
                                style="line-height: 1.4em;"
                            >
                                {{variant.product.name}}
                            </div>
                            <span class="Text-Nowap text-caption text-md-subtitle-2">{{variant.code}}</span>
                        </v-card-text>

                        <v-spacer></v-spacer>

                        <!--Price-->
                        <v-card-text class="text-center pt-0 pb-2 pb-md-4">
                            <div class="text-h6 font-weight-bold error--text">
                                <span v-if="variant.discount.type">
                                    {{ $String.toPrice(variant.warehouse.export.price - variant.discount.amount) }}đ
                                </span>
                                <span v-else>
                                    {{ $String.toPrice(variant.warehouse.export.price) }}đ
                                </span>
                            </div>
                            
                            <div class="text-subtitle-2 text-decoration-line-through">
                                <span v-if="variant.discount.type">
                                    {{ $String.toPrice(variant.warehouse.export.price) }}đ
                                </span>

                                <span v-else>
                                    Discount
                                </span>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data () {
        return {
            variants: [],
            countVariant: 0,
            skip: 0,
            limit: 4
        }
    },

    async fetch() {
        try {
            let Get = await this.$axios.$post(this.$api.laptop.guest.GetListVariantByStatus, {
                status: 'Mới Về',
                skip: this.skip,
                limit: this.limit
            });

            this.variants = Get.variants;
            this.countVariant = Get.countVariant;
        }
        catch(e) {
            throw new Error(e.toString());
        }
    },

    fetchOnServer: false,

    activated() {
        if (this.$fetchState.timestamp <= Date.now() - 30000) {
            this.$fetch()
        }
    },
    
    computed: {
        SmallButton () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return true
                case 'sm': return false
                case 'md': return false
                case 'lg': return false
                case 'xl': return false
            }
        },
    },

    methods : {
        Next () {
            this.skip = this.skip + this.limit;

            this.$fetch();
        },

        Before () {
            let newSkip = (this.skip - this.limit) < 0 ? 0 : (this.skip - this.limit);

            this.skip = newSkip;

            this.$fetch();
        }
    } 
}
</script>
