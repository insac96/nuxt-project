<template>
    <!--Product Link-->

    <!--Fetch Pending-->
    <div v-if="$fetchState.pending || $fetchState.error" class="pa-4 px-md-0">
        <v-skeleton-loader type="image, article"></v-skeleton-loader>

        <v-alert v-if="$fetchState.error" type="error" class="BoxShadow mt-4"> {{$fetchState.error.message}} </v-alert>
    </div>

    <!--Fetch Done-->
    <div class="BoxShadow pa-0" v-else>
        <!--Product Information-->
        <v-card tile flat>
            <!--Header-->
            <v-sheet color="heading" class="px-4 py-2 Sticky_Top">
                <span class="text-h6 text-sm-h5 grey--text text--darken-1 font-weight-bold">Thông Tin</span>
            </v-sheet>

            <!--Body-->
            <v-row no-gutters>
                <v-col cols="12" sm="4" md="5" class="mb-0 mb-sm-6">
                    <GProductLinkImages :images="Product.images"></GProductLinkImages>
                </v-col>

                <v-col cols="12" sm="8" md="7" class="mb-0 mb-sm-6">
                    <GProductLinkInformarion :product="Product" :variantQuery="VariantQuery"></GProductLinkInformarion>
                </v-col>
            </v-row>
        </v-card>

        <!--Product Article-->
        <LazyHydrate when-visible>
            <GProductLinkArticle :article="Product.article" v-if="Product.article"></GProductLinkArticle>
        </LazyHydrate>

        <!--Product Comment-->
        <LazyHydrate when-visible>
            <GProductLinkComment :product="Product"></GProductLinkComment>
        </LazyHydrate>

        <!--Product Tags-->
        <LazyHydrate when-visible>
            <GProductLinkTags :product="Product"></GProductLinkTags>
        </LazyHydrate>
    </div>
</template>

<script>
export default {
    scrollToTop: true,

    data () {
        return {
            Product: null,
            VariantQuery: null
        }
    },

    activated() {
        if (this.$fetchState.timestamp <= Date.now() - 30000) {
            this.$fetch()
        }
    },

    async fetch(){
        try {
            let Product = await this.$axios.$post(this.$api.laptop.guest.GetProductByLink, {
                link: this.$route.params.link
            });

            let VariantQuery = Product.variants.find(i => i.code == this.$route.query.variant);

            this.Product = Product;
            this.VariantQuery = VariantQuery ? VariantQuery : null;
        }
        catch(e){
            throw new Error(e.toString());
        }
    },

    head () {
        return {
            title: !this.Product ? 'Loading' : this.Product.name,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: !this.Product ? 'Loading' : this.Product.name
                },
                {
                    hid: 'og:url',
                    name: 'og:urlurl',
                    property: 'og:url',
                    content: `${this.$Config.baseUrl}${this.$route.path}`
                },
                {
                    hid: 'og:type',
                    name: 'og:type',
                    property: 'og:type',
                    content: 'article'
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property: 'og:title',
                    content: !this.Product ? 'Loading' : this.Product.name
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property: 'og:description',
                    content: !this.Product ? 'Loading' : this.Product.name
                },
                {
                    hid: 'og:image',
                    name: 'og:image',
                    property: 'og:image',
                    content: !this.Product ? 'Loading' : this.Product.images[0]
                },
            ]
        }
    },
}
</script>