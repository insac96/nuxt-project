<template>
    <!--a-layout-nav-left-->

    <v-list nav>
        <div v-for="item in items" :key="item.title">
            <v-list-item v-if="!item.child" :to="item.path" color="primary" class="mb-2">
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-title class="font-weight-bold">{{item.title}}</v-list-item-title>
            </v-list-item>

            <v-list-group
                v-else
                :prepend-icon="item.icon"
                color="primary"
                no-action
                class="mb-2"
            >
                <template v-slot:activator>
                    <v-list-item-title class="font-weight-bold">{{item.title}}</v-list-item-title>
                </template>

                <v-list-item v-for="child in item.child" :key="child.title" :to="child.path" class="pl-10 mb-2">
                    <v-list-item-icon>
                        <v-icon>{{ child.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title class="font-weight-medium">{{ child.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </div>
    </v-list>
</template>

<script>
export default {
    props: ['drawer'],

    data () {
        return {
            t: this.drawer,
            items: [
                { title: 'Thống Kê', icon: 'pie_chart', path: '/admin/statistical' },
                { 
                    title: 'Đơn Hàng', icon: 'shopping_cart',
                    child: [
                        { title: 'Giao Hàng', icon: 'local_shipping', path: '/admin/order/delivery' },
                        { title: 'Giữ Hàng', icon: 'store', path: '/admin/order/preorder' }
                    ]
                },
                { title: 'Tin Tức', icon: 'local_library', path: '/admin/news' },
                {
                    title: 'Laptop', icon: 'laptop',
                    child: [
                        { title: 'Hãng Sản Xuất', icon: 'apartment', path: '/admin/laptop/company'},
                        { title: 'Sản Phẩm', icon: 'laptop', path: '/admin/laptop/product'},
                    ]
                },
                { title: 'Thành Viên', icon: 'supervisor_account', path: '/admin/user' }
            ]
        }
    }
}
</script>