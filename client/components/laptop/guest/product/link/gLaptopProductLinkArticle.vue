<template>
    <!--g_laptop_product_link_article-->

    <v-card tile flat>
        <!--Header-->
        <v-sheet color="heading" class="px-4 py-2 Sticky_Top">
            <span class="text-h6 text-sm-h5 grey--text text--darken-1 font-weight-bold">Đánh Giá Chi Tiết</span> 
        </v-sheet>

        <!--Body-->
        <v-card-text>
            <PBoxContent :content="content" :mini="true"></PBoxContent>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['article'],

    data () {
        return {
            content: this.article.content,
        }
    }
}
</script>