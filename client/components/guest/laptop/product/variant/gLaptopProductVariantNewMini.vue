<template>
    <!--g_laptop_product_variant_new_mini-->

    <v-card flat tile  color="transparent">
        <!--Header-->
        <v-sheet class="d-flex justify-space-between align-center px-4 py-3 Sticky_Top" color="background">
            <span class="text-h5 text-sm-h4 secondary--text">Hàng Mới Về</span>

            <div>
                <v-btn
                    class="BoxShadow"
                    :disabled="(this.skip == 0)" 
                    fab :small="!SmallButton" :x-small="SmallButton"
                    @click="Before"
                >
                    <v-icon>navigate_before</v-icon>
                </v-btn>

                <v-btn 
                    class="BoxShadow"
                    fab :small="!SmallButton" :x-small="SmallButton"
                    @click="Next"
                >
                    <v-icon>navigate_next</v-icon>
                </v-btn>
            </div>
        </v-sheet>

        <!--Body-->
        <v-card-text v-if="$fetchState.pending" flat tile color="card">
            <v-row dense>
                <v-col cols="6" md="3" class="pa-1 pa-sm-2" v-for="i in 4" :key="i">
                    <v-skeleton-loader type="image, article"></v-skeleton-loader>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-text v-else-if="$fetchState.error" flat tile>
            <v-alert type="error" class="BoxShadow"> {{$fetchState.error.message}} </v-alert>
        </v-card-text>

        <v-card-text v-else>
            <v-alert type="info" color="primary" class="BoxShadow" tile v-if="variants.length < 1">Hiện Tại Không Có Sản Phẩm Để Hiển Thị</v-alert>

            <v-row dense align="stretch" v-else>
                <v-col 
                    cols="6" md="3"
                    class="d-flex child-flex"
                    v-for="(variant, indexVariant) in variants" :key="indexVariant"
                >
                    <v-card 
                        class="d-flex flex-column BoxShadow"
                        :ripple="false"
                        :to="`/guest/laptop/product/${variant.product.link}?variant=${variant._id}`"
                    >
                        <!--Image-->
                        <v-img 
                            class="mx-auto rounded-0" 
                            :src="$Image.Get(variant.product.images[0], 'm')" max-width="100%" 
                            :alt="variant.name" 
                        ></v-img>
                        
                        <!--Status and Discount Amount-->
                        <div class="d-flex">
                            <v-chip 
                                label color="primary" 
                                class="rounded-0 font-weight-bold px-2 px-sm-3 text-caption text-sm-subtitle-2"
                            >
                                {{variant.status}}
                            </v-chip>

                            <v-chip
                                v-if="variant.discount.type"
                                label color="error" 
                                class="rounded-0 font-weight-bold px-2 px-sm-3 text-caption text-sm-subtitle-2"
                            >
                                - {{ $String.toPrice(variant.discount.amount) }}đ
                            </v-chip>
                        </div>

                        <!--Information-->
                        <v-card-text style="min-height: 105px;" class="py-2 py-sm-4">
                            <div
                                class="text-subtitle-1 text-sm-h6 font-weight-bold"
                                style="line-height: 1.6rem; word-break: break-word;"
                            >
                                {{variant.product.name}}
                            </div>
                            <span class="text-caption text-sm-subtitle-2">CODE: {{variant.code}}</span>
                        </v-card-text>

                        <v-spacer></v-spacer>

                        <!--Price-->
                        <v-card-text class="text-center pt-0 pb-2 pb-sm-4">
                            <div class="text-h6 font-weight-bold error--text">
                                <span v-if="variant.discount.type">
                                    {{ $String.toPrice(variant.price - variant.discount.amount) }}đ
                                </span>
                                <span v-else>
                                    {{ $String.toPrice(variant.price) }}đ
                                </span>
                            </div>
                            <div class="text-subtitle-2 text-decoration-line-through">
                                <span v-if="variant.discount.type">
                                    {{ $String.toPrice(variant.price)}}đ
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
import LaptopAPI from '~/setting/laptop/api';

export default {
    data () {
        return {
            variants: [],
            skip: 0,
            limit: 4
        }
    },

    async fetch() {
        try {
            let Variants = await this.$axios.$post(LaptopAPI.guest.GetVariantByStatus, {
                status: 'Mới Về',
                skip: this.skip,
                limit: this.limit
            });

            this.variants = Variants;
        }
        catch(e) {
            throw new Error(e.toString());
        }
    },

    fetchOnServer: false,
    
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
