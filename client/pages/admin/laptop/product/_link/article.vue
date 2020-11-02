<template>
    <v-card tile flat>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary--text">Article</v-card-title>
        <v-card-subtitle>Bài đánh giá của sản phẩm</v-card-subtitle>

        <!--Body-->
        <client-only>
            <BoxEditor :content="this.Content" @save="Save" :loading="Loading"></BoxEditor>
        </client-only>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    props: ['product'],

    data () {
        return {
            Article: this.product.article,
            Content: this.product.article ? this.product.article.content : '',
            NewArticle: {
                company: null,
                trademark: null,
                product: null,
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
                this.NewArticle.company = this.product.company._id;
                this.NewArticle.trademark = this.product.trademark._id;
                this.NewArticle.product = this.product._id;
                this.NewArticle.content = this.Content;

                let NewArticle = await this.$axios.$post(LaptopAPI.admin.CreateNewArticle, this.NewArticle);

                this.Loading = false;
                this.Article = NewArticle;
            }
            catch(e){
                this.Loading = false;
            }   
        },

        async EditArticle () {
            this.Loading = true;
            
            try {
                this.Article.content = this.Content;

                let Edit = await this.$axios.$post(LaptopAPI.admin.EditArticle, {
                    _id: this.Article._id,
                    content: this.Article.content
                });

                this.Loading = false;
            }
            catch(e){
                this.Loading = false;
            }   
        },
    }
}
</script>