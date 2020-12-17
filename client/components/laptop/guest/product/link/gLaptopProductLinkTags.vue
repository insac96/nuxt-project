<template>
    <!--g_laptop_product_link_tags-->

    <v-card tile flat>
        <!--Header-->
        <v-sheet color="heading" class="Sticky_Top px-4 py-2">
            <span class="text-h6 text-sm-h5 grey--text text--darken-1 font-weight-bold">Tags</span> 
        </v-sheet>

        <!--Body-->
        <v-card-text>
            <v-chip class="my-1">{{ product.company.name }}</v-chip>
            <v-chip class="my-1">{{ product.trademark.name }}</v-chip>
            <v-chip class="my-1">{{ product.name }}</v-chip>
            <v-chip v-for="(variant, indexVariant) in product.variants" :key="indexVariant" class="my-1">
                {{ variant.code }}
            </v-chip>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['product'],

    data () {
        return {
            
        }
    },

    mounted(){
        console.log(this.product)
    }
}
</script>