<template>
    <!--Laptop Product Link Layout-->

    <v-row no-gutters justify="center">
        <!--Menu-->
        <v-col cols="3" class="pr-3">
            <v-navigation-drawer width="auto" height="auto" permanent class="Nav_Child Sticky_Top BoxShadow" color="nav">
                <v-list nav >
                    <!--List Header-->
                    <v-list-item>
                        <v-list-item-content>
                        <v-list-item-title class="title font-weight-bold">
                            Menu
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{Product.name}}
                        </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <!--List Body-->
                    <v-list-item
                        v-for="item in Menu"
                        :key="item.title"
                        link color="primary_admin"
                        :to="`/admin/laptop/product/${$route.params.link}/${item.path}`"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title class="font-weight-medium">{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-col>

        <!--Main-->
        <v-col cols="9">
            <nuxt-child :product="Product"></nuxt-child>
        </v-col>
    </v-row>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    async asyncData({$axios, params}){
        try {
            let Product = await $axios.$post(LaptopAPI.admin.GetProductByLink, {
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
                //{ title: 'Cài Đặt', icon: 'settings', path: `setting` },
            ],
        }  
    }
}
</script>