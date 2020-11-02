<template>
    <!--Laptop News Create-->

    <v-card tile flat>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary--text">Create News</v-card-title>
        <v-card-subtitle>Tạo tin tức mới</v-card-subtitle>

        <!--Infomation-->
        <v-card-text class="pb-0">
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
        </v-card-text>

        <!--Content-->
        <v-card-text class="pa-0">
            <client-only>
                <PBoxEditor :content="this.News.content" @save="SaveContent" :loading="Loading.create" title-button="Tạo Tin Tức"></PBoxEditor>
            </client-only>
        </v-card-text>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    data () {
        return {
            News: {
                title: null,
                image: null,
                content: '',
            },
            Validate: true,
            Loading: {
                upload: false,
                create: false
            },
            ErrorHint: {
                title: null,
                image: null
            }
        }
    },

    methods: {
        SaveContent (content) {
            this.News.content = content;

            this.CreateNews();
        },

        async CreateNews () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.create = true;
            
            try {
                let News = await this.$axios.$post(LaptopAPI.admin.CreateNews, {
                    title: this.News.title,
                    image: this.News.image,
                    content: this.News.content,
                });

                if(News.error) throw News;

                this.$router.push(`${News._id}`);
                this.Loading.create = false;
            }
            catch(e){
                this.Loading.create = false;

                if(e.error && e.status == 'title') return this.ErrorHint.title = e.message;
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