<template>
    <!--P_Box_Content-->

    <v-sheet>
        <div class="QuillContent">
            <div v-if="!mini" v-html="content"></div>
            <div v-else v-html="content" :class="ShowAll ? '' : 'MiniArticle'"></div>
        </div>

        <v-sheet class="d-flex justify-center pt-4" v-if="mini">
            <v-btn rounded elevation="0" color="primary" class="px-6" @click="ShowAll = !ShowAll">
                {{ ShowAll ? 'Ẩn Nội Dung' : 'Xem Toàn Bộ Nội Dung'}}
            </v-btn>
        </v-sheet>
    </v-sheet>
</template>

<script>
export default {
    props: {
        content: {
            type: String
        },
        mini: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            ShowAll: false
        }
    }
}
</script>

<style scoped>
    .MiniArticle {
        max-height: 500px;
        overflow: hidden;
    }

    .QuillContent {
        font-size: 1.5em;
        line-height: 1.5em;
    }

    .QuillContent /deep/ p {
        margin-bottom: 0;
    }

    .QuillContent /deep/ ul {
        padding-left: 1.5em;
    }

    .QuillContent /deep/ li {
        padding-left: 1.5em;
    }

    .QuillContent /deep/ .ql-size-small {
        font-size: 0.9em;
    }

    .QuillContent /deep/ .ql-size-large {
        font-size: 1.6em;
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
            font-size: 1.3em;
            line-height: 1.4em;
        }

        .QuillContent /deep/ .ql-size-small {
            font-size: 1.1em;
            line-height: 1.4em;
        }

        .QuillContent /deep/ .ql-size-large {
            font-size: 1.4em;
            line-height: 1.2em;
        }
    }
</style>

