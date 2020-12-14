<template>
    <!--Laptop News _id-->

    <div>
        <!--Main-->
        <v-card tile flat>
            <!--Header-->
            <v-card-title class="font-weight-bold text-h4 primary--text">Edit News</v-card-title>
            <v-card-subtitle>Chỉnh sửa tin tức mới</v-card-subtitle>

            <!--Tabs-->
            <v-tabs background-color="primary" dark hide-slider v-model="Tab">
                <v-tab>Thông Tin</v-tab>
                <v-tab>Nội Dung</v-tab>
                <v-tab>Cài Đặt</v-tab>

                <!--Tabs-Items-->
                <v-tabs-items v-model="Tab">
                    <!--Information-->
                    <v-tab-item class="pt-4">
                        <v-card-text>
                            <v-form ref="form" v-model="Validate">
                                <!--News Name-->
                                <v-text-field
                                    v-model="News.title"
                                    :rules="[ $Rules.required, $Rules.multiSpace ]"
                                    label="News Title"
                                    filled rounded
                                    placeholder="Tiêu đề tin tức"
                                    append-icon="apartment"
                                    color="primary"
                                    item-color="create"
                                    autocomplete="off"
                                    :error-messages="ErrorHint.title"
                                >
                                    <template v-slot:message="{ message }">
                                        {{ ErrorHint.title ? ErrorHint.title : message }}
                                    </template>
                                </v-text-field>

                                <!--Company Logo-->
                                <v-text-field
                                    v-model="News.image"
                                    label="News Image"
                                    filled rounded
                                    placeholder="Hình ảnh hiển thị"
                                    append-icon="image"
                                    color="primary"
                                    :disabled="Loading.upload"
                                    autocomplete="off"
                                    :error-messages="ErrorHint.image"
                                    @click:append="$refs.File.click()"
                                >
                                    <template v-slot:message="{ message }">
                                        {{ ErrorHint.image ? ErrorHint.image : message }}
                                    </template>
                                </v-text-field>
                                <input type="file" ref="File" hidden @change="Upload">
                            </v-form>

                            <v-sheet class="d-flex justify-end">
                                <v-btn
                                    rounded color="primary"
                                    large elevation="0"
                                    :loading="Loading.editInformation"
                                    @click="EditInformation"
                                >
                                    Lưu
                                </v-btn>
                            </v-sheet>
                        </v-card-text>
                    </v-tab-item>

                    <!--Content-->
                    <v-tab-item>
                        <v-card-text class="pa-0">
                            <client-only>
                                <PBoxEditor :content="News.content" @save="EditContent" :loading="Loading.editContent" title-button="Lưu Nội Dung"></PBoxEditor>
                            </client-only>
                        </v-card-text>
                    </v-tab-item>

                    <!--Setting-->
                    <v-tab-item>
                        <v-card-text>
                            <!--Visibility-->
                            <v-sheet class="d-flex justify-space-between mb-4">
                                <span class="text-subtitle-1 font-weight-bold">Ẩn/Hiện tin tức</span>
                                <v-switch 
                                v-model="News.visibility" 
                                hide-details color="primary" 
                                class="ma-0 pa-0" 
                                @change="EditVisibilityNews"
                                :disabled="Loading.editVisibility"
                                ></v-switch>
                            </v-sheet>

                            <!--Top-->
                            <v-sheet class="d-flex justify-space-between mb-4">
                                <span class="text-subtitle-1 font-weight-bold">Hiển thị lên trang chủ</span>
                                <v-switch v-model="News.top" hide-details color="primary" class="ma-0 pa-0" @change="EditTopNews"></v-switch>
                            </v-sheet>

                            <!--Delete-->
                            <v-sheet class="d-flex justify-center">
                                <v-btn
                                    rounded color="delete"
                                    dark elevation="0"
                                    @click="Dialog.delete = true"
                                >
                                    Xóa Tin Tức
                                </v-btn>
                            </v-sheet>
                        </v-card-text>
                    </v-tab-item>
                </v-tabs-items>
            </v-tabs>
        </v-card>

        <!--Dialog-->
        <div>
            <!--Dialog Delete-->
            <v-dialog v-model="Dialog.delete" persistent max-width="450">
                <ALaptopNewsDelete 
                    @delete="$route.push('/admin/laptop/news')"
                    @cancel="Dialog.delete = false" 
                    :news="News"
                ></ALaptopNewsDelete>
            </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({$axios, $api, params}){
        try {
            let News = await $axios.$post($api.laptop.admin.GetNewsByID, {
                _id: params.id
            });

            return { News };
        }
        catch(e){
            return false;
        }
    },

    data () {
        return {
            Tab: 0,
            Validate: true,
            Loading: {
                upload: false,
                delete: false,
                editInformation: false,
                editContent: false,
                editTop: false,
                editVisibility: false
            },
            Dialog: {
                delete: false
            },
            ErrorHint: {
                title: null,
                image: null
            }
        }
    },

    methods: {
        //Edit Information
        async EditInformation () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.editInformation = true;
            
            try {
                let News = await this.$axios.$post(this.$api.laptop.admin.EditInformationNews, {
                    _id: this.News._id,
                    title: this.News.title,
                    image: this.News.image,
                });

                if(News.error) throw News;

                this.Loading.editInformation = false;
            }
            catch(e){
                this.Loading.editInformation = false;

                if(e.error && e.status == 'title') return this.ErrorHint.title = e.message;
            } 
        },

        //Edit Content
        async EditContent (content) {
            this.Loading.editContent = true;
            
            try {
                let News = await this.$axios.$post(this.$api.laptop.admin.EditContentNews, {
                    _id: this.News._id,
                    content: content
                });

                if(News.error) throw News;

                this.News.content = content;
                this.Loading.editContent = false;
            }
            catch(e){
                this.Loading.editContent = false;
            } 
        },

        //Edit Top
        async EditTopNews () {
            this.Loading.editTop = true;

            try {
                let Change = await this.$axios.$post(this.$api.laptop.admin.EditTopNews, {
                    _id: this.News._id,
                    top: this.News.top
                });

                this.Loading.editTop = false;
            }
            catch(e){
                this.News.top = !this.News.top;
                this.Loading.editTop = false;
            }
        },

        //Edit Visibility
        async EditVisibilityNews () {
            this.Loading.editVisibility = true;

            try {
                let Change = await this.$axios.$post(this.$api.laptop.admin.EditVisibilityNews, {
                    _id: this.News._id,
                    visibility: this.News.visibility
                });

                this.Loading.editVisibility = false;
            }
            catch(e){
                this.News.visibility = !this.News.visibility;
                this.Loading.editVisibility = false;
            }
        },

        //Upload Image
        async Upload (event) {
            let File = event.target.files[0];
            this.Loading.upload = true;

            try {
                let ImageData = await this.$Image.Upload(File);

                this.News.image = ImageData.link;
                this.Loading.upload = false;
            }
            catch(e){
                this.Loading.upload = false;
                this.ErrorHint.image = e.toString();
            }
        },
    }
}
</script>