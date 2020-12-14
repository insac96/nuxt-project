<template>
    <!--Laptop Product Link Layout-->
    
    <div>
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
    async asyncData({$axios, $api, params}){
        try {
            let Product = await $axios.$post($api.laptop.admin.GetProductByLink, {
                link: params.link
            });

            return { Product };
        }
        catch(e){
            return false;
        }
    },

    data () {
        return {
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
    }
}
</script>