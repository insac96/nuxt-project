<template>
    <v-card tile class="BoxShadow-Hover">
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary--text">Article</v-card-title>
        <v-card-subtitle>Bài đánh giá của sản phẩm</v-card-subtitle>

        <!--Body-->
        <client-only>
            <quill-editor 
                ref="Editor" 
                :content="Content" 
                @change="Change" 
                class="Editor"
            ></quill-editor>

            <input type="file" id="file" hidden>
        </client-only>

        <!--Footer-->
        <v-sheet class="Sticky_Bottom d-flex px-4 py-2" color="heading">
            <v-spacer></v-spacer>

            <v-btn 
                v-if="!Article"
                color="primary" dark 
                elevation="0" tile 
                :loading="Loading.create"
                @click="CreateNewArticle"
            >
                Tạo Bài Viết
            </v-btn>

            <v-btn
                v-else
                color="primary" dark 
                elevation="0" tile 
                :loading="Loading.edit"
                @click="EditArticle"
            >
                Lưu Bài Viết
            </v-btn>
        </v-sheet>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';
import 'quill/dist/quill.snow.css'; 

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
            Loading: {
                edit: false,
                create: false
            }
        }
    },

    methods: {
        Change({ quill, html, text }) {
            this.Content = html;
        },

        async CreateNewArticle () {
            this.Loading.create = true;
            
            try {
                this.NewArticle.company = this.product.company._id;
                this.NewArticle.trademark = this.product.trademark._id;
                this.NewArticle.product = this.product._id;
                this.NewArticle.content = this.Content;

                let NewArticle = await this.$axios.$post(LaptopAPI.admin.CreateNewArticle, this.NewArticle);

                this.Loading.create = false;
                this.Article = NewArticle;
            }
            catch(e){
                this.Loading.create = false;
            }   
        },

        async EditArticle () {
            this.Loading.edit = true;
            
            try {
                this.Article.content = this.Content;

                let Edit = await this.$axios.$post(LaptopAPI.admin.EditArticle, {
                    _id: this.Article._id,
                    content: this.Article.content
                });

                this.Loading.edit = false;
            }
            catch(e){
                this.Loading.edit = false;
            }   
        },
    }
}
</script>

<style lang="scss">
    .quill-editor {
        .ql-editor {
            font-size: 1.3em;
            padding: 0;

            a {
                text-decoration: none;
            }

            img {
                width: auto;
                max-width: 100%;
            }

            &.ql-blank::before {
                color: #b6b6b6 !important;
            }  
        }
        
        //Tollbar
        .ql-toolbar {
            position: sticky;
            top: 64px;
            z-index: 1;
            display: flex;
            align-items: center;
            height: 50px !important;
            background: var(--v-heading-base) !important;
            border-width: 0 !important;
            
            button {
                outline: none !important;
            }
        }

        //Main
        .ql-container {
            font-family: Quicksand, sans-serif;
            border-width: 0 !important;
            padding: 16px !important;
        }

        //Stoke and Fill
        .ql-stroke {
            stroke: var(--v-heading_text-base) !important;
        }
        .ql-fill {
            fill: var(--v-heading_text-base) !important;
        }
        .ql-active {
            .ql-stroke {
                stroke: var(--v-primary-base) !important;
            }
            .ql-fill {
                fill: var(--v-primary-base) !important;
            }
        }
        
        //Tooltip
        .ql-tooltip {
            font-size: 1.2em;
            font-weight: bold;
            border-radius: 8px;
            border-width: 0 !important;
            box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12) !important;

            input[type=text] {
                background: var(--v-heading-base) !important;
                color: var(--v-heading_text-base) !important;
                border-width: 0 !important;
                border-radius: 15px;
                padding: 5px 10px !important ;
                outline: none !important;
            }
        }

        //Picker
        .ql-picker {
            &.ql-size {
                background: var(--v-heading-base) !important;

                .ql-picker-label {
                    outline: none !important;
                    border-color: var(--v-heading_text-base) !important;

                    &::before {
                        color: var(--v-primary-base) !important;
                    }
                }
            }

            &.ql-align, &.ql-color {
                background: var(--v-heading-base) !important;

                .ql-picker-label {
                    outline: none !important;
                    border: none !important;
                }
            }


            .ql-picker-options {
                transform: translateY(5px);
                border-width: 0 !important;
                box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12) !important;

                .ql-picker-item {
                    outline: none !important;
                    margin: 0 !important;

                    &:hover {
                        color: var(--v-primary-base) !important;

                        .ql-stroke {
                            stroke: var(--v-primary-base) !important;
                        }
                    }
                }

                .ql-stroke {
                    stroke: grey !important;
                }
            }

            .ql-active {
                color: var(--v-primary-base) !important;
                border-color: var(--v-primary-base) !important;
            }
            
        }
    }
</style>