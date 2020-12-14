<template>
    <!--a_laptop_news_delete-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 delete--text">Delete News</v-card-title>
        <v-card-subtitle>Xóa dữ liệu tin tức</v-card-subtitle>

        <!--Body-->
        <v-card-text>
            <v-alert type="info" outlined color="delete" prominent class="rounded-xl">
                Chức năng này sẽ xóa tin tức <strong>{{news.title}}</strong>. Bạn có chắc chắn muốn xóa.
            </v-alert>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-spacer></v-spacer>
            <v-btn 
                rounded elevation="0" large 
                :disabled="Loading.delete"
                @click="$emit('cancel')"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="delete" dark
                rounded elevation="0" 
                large class="mx-0" 
                :loading="Loading.delete" 
                @click="DeleteNews"
            >
                Xóa
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props : ['news'],

    data () {
        return {
            Loading: {
                delete: false
            }
        }
    },

    methods : {
        async DeleteNews () {
            this.Loading.delete = true;
            
            try {
                let Delete = await this.$axios.$post(this.$api.laptop.admin.DeleteNews, {
                    _id: this.news._id
                });

                this.Loading.delete = false;

                this.$emit('delete');
                this.$emit('cancel');
            }
            catch(e){
                this.Loading.delete = false;
            }   
        }
    },
}
</script>