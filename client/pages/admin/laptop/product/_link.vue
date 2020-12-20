<template>
    <!--Laptop Product Link Layout-->

    <div v-if="$fetchState.pending || $fetchState.error" class="pa-4 px-md-0">
        <v-skeleton-loader type="image, article"></v-skeleton-loader>

        <v-alert v-if="$fetchState.error" type="error" class="mt-4"> {{$fetchState.error.message}} </v-alert>
    </div>
    
    <div v-else>
        <!--Tabs-->
        <v-tabs fixed-tabs background-color="primary" icons-and-text hide-slider dark>
            <v-tab v-for="(item, index) in Menu" :key="index" :to="item.path" link>
                {{item.title}}

                <v-icon>{{item.icon}}</v-icon>
            </v-tab>
        </v-tabs>

        <!--Main-->
        <nuxt-child :product="Product"></nuxt-child>
    </div>
</template>

<script>
export default {
    data () {
        return {
            Product: null,

            Menu: [
                { title: 'Thông Tin', icon: 'import_contacts', path: `information` },
                { title: 'Hình Ảnh', icon: 'image', path: `image` },
                { title: 'Cấu Hình', icon: 'donut_small', path: `configuration` },
                { title: 'Biến Thể', icon: 'view_carousel', path: `variant` },
                { title: 'Bài Đánh Giá', icon: 'article', path: `article` },
                { title: 'Bình Luận', icon: 'chat', path: `comment` },
                { title: 'Cài Đặt', icon: 'settings', path: `setting` },
            ],
        }  
    },

    async fetch(){
        try {
            let Product = await this.$axios.$post(this.$api.laptop.admin.GetProductByLink, {
                link: this.$route.params.link
            });

            this.Product = Product
        }
        catch(e){
            throw new Error(e.toString());
        }
    },

    fetchOnServer: false,
}
</script>