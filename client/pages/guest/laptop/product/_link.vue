<template>
    <v-container v-if="$fetchState.pending">
        <v-card flat tile>
            <v-skeleton-loader type="image, article"></v-skeleton-loader>
        </v-card>
    </v-container>

    <v-container class="pa-0" v-else-if="!$fetchState.pending && !$fetchState.error">
        <!--Product Information-->
        <v-card tile flat>
            <!--Header-->
            <v-sheet color="heading" class="px-4 py-2 Sticky_Top">
                <span class="text-h6 text-sm-h5 grey--text text--darken-1 font-weight-bold">Thông Tin</span>
            </v-sheet>

            <!--Body-->
            <v-row no-gutters>
                <v-col cols="12" md="5">
                    <GLaptopProductLinkImages :images="Product.images"></GLaptopProductLinkImages>
                </v-col>

                <v-col cols="12" md="7">
                    <GLaptopProductLinkInformarion :product="Product" :variantQuery="VariantQuery"></GLaptopProductLinkInformarion>
                </v-col>
            </v-row>
        </v-card>

        <!--Product Article-->
        <GLaptopProductLinkArticle :article="Product.article"></GLaptopProductLinkArticle>

        <!--Product Comment-->
        <GLaptopProductLinkComment :product="Product"></GLaptopProductLinkComment>
    </v-container>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    scrollToTop: true,

    data () {
        return {
            Product: null,
            VariantQuery: null
        }
    },

    async fetch(){
        try {
            let Product = await this.$axios.$post(LaptopAPI.guest.GetProductByLink, {
                link: this.$route.params.link
            });

            let VariantQuery = Product.variants.find(i => i._id == this.$route.query.variant);

            this.Product = Product;
            this.VariantQuery = VariantQuery ? VariantQuery : null;
        }
        catch(e){
            throw new Error(e.toString());
        }
    },

    fetchOnServer: false
}
</script>