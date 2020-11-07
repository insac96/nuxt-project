<template>
    <v-card tile flat>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary--text">Article</v-card-title>
        <v-card-subtitle>Bài đánh giá của sản phẩm</v-card-subtitle>

        <!--Body-->
        <client-only>
            <PBoxEditor :content="this.Content" @save="Save" :loading="Loading"></PBoxEditor>
        </client-only>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    props: ['product'],

    data () {
        return {
            Content: this.product.article ? this.product.article.content : '',
            NewArticle: {
                company: this.product.company._id,
                trademark: this.product.trademark._id,
                product: this.product._id,
                content: null
            },
            Loading: false
        }
    },

    methods: {
        Save (content) {
            this.Content = content;

            if(this.product.article) return this.EditArticle();

            this.CreateNewArticle();
        },

        async CreateNewArticle () {
            this.Loading = true;
            
            try {
                this.NewArticle.content = this.Content;

                let NewArticle = await this.$axios.$post(LaptopAPI.admin.CreateNewArticle, this.NewArticle);

                this.product.article = NewArticle;
                this.Loading = false;
            }
            catch(e){
                this.Loading = false;
            }   
        },

        async EditArticle () {
            this.Loading = true;
            
            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditArticle, {
                    _id: this.product.article._id,
                    content: this.Content
                });

                this.product.article.content = this.Content;

                this.Loading = false;
            }
            catch(e){
                this.Loading = false;
            }   
        },
    }
}
</script>