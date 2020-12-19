<template>
    <!--Laptop News Index-->

    <div>
        <!--Main-->
        <v-card tile flat>
            <!--Header-->
            <div class="d-flex align-center">
                <!--Header Left-->
                <div>
                    <v-card-title class="font-weight-bold text-h4 primary--text">News</v-card-title>
                    <v-card-subtitle>Quản lý tin tức</v-card-subtitle>
                </div>

                <v-spacer></v-spacer>

                <!--Header Right-->
                <v-btn 
                    color="primary" dark rounded 
                    elevation="0" large class="mr-4" 
                    to="news/create"
                >
                    <v-icon>add</v-icon>
                    Thêm Mới
                </v-btn>
            </div>

            <!--Body-->
            <div>
                <!--Table-->
                <v-simple-table class="Table">
                    <template v-slot:default>
                        <!--Table Header-->
                        <thead>
                            <tr>
                                <th>Tiêu Đề</th>
                                <th class="text-center" width="120">Hình Ảnh</th>
                                <th class="text-center" width="60">Top</th>
                                <th class="text-right" width="120">Chức Năng</th>
                            </tr>
                        </thead>

                        <!--Table Body-->
                        <tbody>
                            <tr v-for="(news, indexNews) in ListNews" :key="indexNews">
                                <!--1 - Title-->
                                <td class="text-capitalize py-4">
                                    <nuxt-link :to="`news/${news._id}`">
                                        {{ news.title }}
                                    </nuxt-link>
                                </td>

                                <!--2 - Image-->
                                <td class="text-center">
                                    {{ news.image ? 'Yes' : 'No' }}
                                </td>

                                <!--3 - Top-->
                                <td class="text-center">
                                    <div class="d-flex justify-center">
                                        <v-switch 
                                            hide-details
                                            v-model="news.top" :disabled="Loading.top"
                                            color="primary" class="ma-0 pa-0"
                                            @change="EditTopNews(news)"
                                        ></v-switch>
                                    </div>
                                </td>

                                <!--4 - Funtion-->
                                <td class="text-right">
                                    <v-btn 
                                        :color="news.visibility ? 'primary' : 'grey'" 
                                        icon small elevation="0"
                                        :disabled="Loading.visibility"
                                        @click="EditVisibilityNews(news)"
                                    >
                                        <v-icon>{{news.visibility ? 'visibility' : 'visibility_off'}}</v-icon>
                                    </v-btn>

                                    <v-btn
                                        color="error"
                                        icon small elevation="0"
                                        @click="ShowDialogDeleteNews(indexNews)"
                                    >
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>

                <!--If List Product Empty-->
                <v-alert
                    v-if="ListNews.length < 1" 
                    class="mb-0" tile
                >
                    Không có tin tức nào hiển thị
                </v-alert>

                <!--Body Footer-->
                <v-sheet class="d-flex justify-space-between align-center py-2 px-4" color="heading">
                    <!--Count-->
                    <v-chip> 
                        <span>{{ListNews.length}} / {{Count}}</span>
                    </v-chip>

                    <!--Button Next Previous-->
                    <v-btn 
                        elevation="0" rounded 
                        color="primary"
                        v-if="(ListNews.length < Count)" 
                        @click="ShowNewsMore();"
                    >
                        More
                    </v-btn>
                </v-sheet>
            </div>
        </v-card>

        <!--Dialog-->
        <div>
            <!--Dialog Delete-->
            <v-dialog v-model="Dialog.delete.type" persistent max-width="450">
                <ANewsDelete 
                    @delete="DeleteNewsDone"
                    @cancel="Dialog.delete.type = false" 
                    :news="Dialog.delete.select"
                ></ANewsDelete>
            </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({$axios, $api}){
        try {
            let Get = await $axios.$post($api.laptop.admin.GetListNews, {
                skip: 0
            });
            return {
                ListNews: Get.news,
                Count: Get.count
            }
        }
        catch(e){
            return {
                ListNews: [],
                Count: 0
            }
        }
    },

    data () {
        return {
            KeySearch: null,

            Loading: {
                top: false,
                visibility: false
            },

            Dialog: {
                delete: {
                    type: false,
                    index: null,
                    select: null
                }
            },
        }
    },

    methods : {
        //Delete
        ShowDialogDeleteNews (indexNews) {
            this.Dialog.delete.type = true;
            this.Dialog.delete.index = indexNews;
            this.Dialog.delete.select = this.ListNews[indexNews];
        },

        //Delete Done
        DeleteNewsDone () {
            this.$delete(this.ListNews, this.Dialog.delete.index);
            this.Count--;
        },

        //Change Visibility
        async EditVisibilityNews (news) {
            this.Loading.visibility = true;
            news.visibility = !news.visibility;

            try {
                let Change = await this.$axios.$post(this.$api.laptop.admin.EditVisibilityNews, {
                    _id: news._id,
                    visibility: news.visibility
                });

                this.Loading.visibility = false;
            }
            catch(e){
                news.visibility = !news.visibility;
                this.Loading.visibility = false;
            }
        },

        //Change Top
        async EditTopNews (news) {
            this.Loading.top = true;

            try {
                let Change = await this.$axios.$post(this.$api.laptop.admin.EditTopNews, {
                    _id: news._id,
                    top: news.top
                });

                this.Loading.top = false;
            }
            catch(e){
                news.top = !news.top;
                this.Loading.top = false;
            }
        },

        async ShowNewsMore () {
            try {
                let Get = await this.$axios.$post(this.$api.laptop.admin.GetListNews, {
                    skip: this.ListNews.length,
                });

                this.ListNews = this.ListNews.concat(Get.news);
                this.Count = Get.count;
            }
            catch(e){
                return false;
            }
        }
    }
}
</script>