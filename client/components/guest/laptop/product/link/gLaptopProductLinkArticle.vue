<template>
    <!--g_laptop_product_link_article-->

    <v-card tile flat>
        <!--Header-->
        <v-sheet color="heading" class="px-4 py-2 Sticky_Top">
            <span class="text-h6 text-sm-h5 grey--text text--darken-1 font-weight-bold">Đánh Giá Chi Tiết</span> 
        </v-sheet>

        <!--Body-->
        <v-card-text class="QuillContent">
            <div v-html="Article.content" :class="ShowAll ? '' : 'MiniArticle'"></div>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="justify-center pt-0 pb-4">
            <v-btn rounded outlined elevation="0" color="primary" class="px-6" @click="ShowAll = !ShowAll">
                {{ ShowAll ? 'Ẩn Nội Dung' : 'Xem Toàn Bộ Nội Dung'}}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: ['article'],

    data () {
        return {
            Article: this.article,
            ShowAll: false
        }
    }
}
</script>

<style scoped>
    .MiniArticle {
        max-height: calc(100vh - 64px - 48px - 105px);
        overflow: hidden;
    }

    .QuillContent {
        font-size: 1.3em;
        line-height: 1.4em;
    }

    .QuillContent /deep/ .ql-size-small {
        font-size: 1em;
        line-height: 1.4em;
    }

    .QuillContent /deep/ .ql-size-large {
        font-size: 1.4em;
        line-height: 1.4em;
    }

    .QuillContent /deep/ img {
        max-width: 100%;
    }

    .QuillContent /deep/ .ql-align-center {
        text-align: center;
    }

    .QuillContent /deep/ .ql-align-justify {
        text-align: justify;
    }

    .QuillContent /deep/ .ql-align-right {
        text-align: right;
    }

    @media (max-width: 600px){
        .QuillContent {
            font-size: 1.2em;
            line-height: 1.4em;
        }

        .QuillContent /deep/ .ql-size-small {
            font-size: 0.9em;
            line-height: 1.4em;
        }

        .QuillContent /deep/ .ql-size-large {
            font-size: 1.3em;
            line-height: 1.4em;
        }
    }
</style>