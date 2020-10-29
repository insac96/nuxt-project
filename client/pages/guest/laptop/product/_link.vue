<template>
    <v-sheet>
        <!--Header-->
        <v-sheet  color="heading" class="px-4 py-2 Sticky_Top">
            <span class="text-h6 text-sm-h5 grey--text text--darken-1 font-weight-bold">Thông Tin</span>
        </v-sheet>

        <!--Body-->
        <v-row dense class="mb-3 mb-sm-0">
            <v-col cols="12" md="5" class="pa-0 pa-sm-1">
                <GLaptopProductLinkImages :images="Product.images"></GLaptopProductLinkImages>
            </v-col>

            <v-col cols="12" md="7" class="pa-0 pa-sm-1">
                <GLaptopProductLinkInformarion :product="Product" :variantQuery="VariantQuery"></GLaptopProductLinkInformarion>
            </v-col>
        </v-row>

        <!--Product Article-->
        <GLaptopProductLinkArticle :article="Product.article"></GLaptopProductLinkArticle>


        <!--Product Comment-->
        <GLaptopProductLinkComment :product="Product"></GLaptopProductLinkComment>
    </v-sheet>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';

export default {
    scrollToTop: true,

    async asyncData({$axios, route}){
        try {
            let Product = await $axios.$post(LaptopAPI.guest.GetProductByLink, {
                link: route.params.link
            });

            let Query = Product.variants.find(i => i._id == route.query.variant);

            return { 
                Product: Product,
                VariantQuery: Query ? Query : null
            };
        }
        catch(e){
            return false;
        }
    }
}
</script>