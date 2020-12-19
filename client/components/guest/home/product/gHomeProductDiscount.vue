<template>
    <!--g_laptop_product_variant_discount_mini-->

    <v-card flat tile>
        <!--Header-->
        <v-sheet class="Sticky_Top d-flex align-center px-4 py-2" color="heading">
            <!--Header Left-->
            <span class="text-h6 text-sm-h5 heading_text--text font-weight-bold">Giảm Giá</span>

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
        <v-card-text v-if="$fetchState.pending || $fetchState.error">
            <v-alert type="error" color="error" class="BoxShadow" v-if="$fetchState.error">{{ $fetchState.error.message }}</v-alert>
            
            <v-row dense>
                <v-col cols="6" sm="3" class="pa-1" v-for="i in 4" :key="i">
                    <div class="card BoxShadow">
                        <v-skeleton-loader type="image, article"></v-skeleton-loader>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>

        <!--Fetch Done-->
        <v-card-text v-else>
            <v-alert type="info" color="primary" class="BoxShadow mb-0" v-if="variants.length < 1">Hiện Tại Không Có Sản Phẩm Để Hiển Thị</v-alert>

            <v-row dense align="stretch" v-else>
                <v-col 
                    cols="6" sm="3"
                    class="d-flex child-flex"
                    v-for="(variant, indexVariant) in variants" :key="indexVariant"
                >   
                    <GBoxVariant :variant="variant"></GBoxVariant>
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

    async fetch () {
        try {
            let Get = await this.$axios.$post(this.$api.laptop.guest.GetListVariantByDiscount, {
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
