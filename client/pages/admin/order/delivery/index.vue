<template>
    <!--Admin Delivery Page-->

    <v-card tile flat>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary--text">Delivery</v-card-title>
        <v-card-subtitle>Danh sách đơn giao hàng</v-card-subtitle>

        <!--Body-->
        <v-sheet>
            <!--Table-->
            <v-simple-table class="Table">
                <template v-slot:default>
                    <!--Table Header-->
                    <thead>
                        <tr>
                            <th>Người Đặt</th>
                            <th class="text-center" width="120">Ngày Tạo</th>
                            <th class="text-center" width="120">Sản Phẩm</th>
                            <th class="text-center" width="140">Thanh Toán</th>
                            <th class="text-center" width="140">Trạng Thái</th>
                            <th class="text-right" width="120">Chức Năng</th>
                        </tr>
                    </thead>

                    <!--Table Body-->
                    <tbody>
                        <tr v-for="(order, indexOrder) of Orders" :key="indexOrder">
                            <!--User Info-->
                            <td class="py-2">
                                <div class="font-weight-bold">{{ order.vendor.name }}</div>
                                <div class="text-subtitle-1 grey--text">{{ order.vendor.address }}</div>
                            </td>

                            <!--Date Create-->
                            <td class="text-center font-weight-medium">
                                {{ $dayjs(order.create).format('DD/MM/YYYY') }}
                            </td>

                            <!--Products-->
                            <td class="text-center font-weight-medium">
                                {{ order.products.length }}
                            </td>

                            <!--Pay-->
                            <td class="text-center">
                                <v-chip v-if="order.pay == 2" color="info" dark>Đã Thanh Toán</v-chip>
                                <v-chip v-if="order.pay == 1">Chưa Thanh Toán</v-chip>
                            </td>

                            <!--Verification-->
                            <td class="text-center font-weight-medium">
                                <v-chip v-if="order.verification.type" color="teal" dark>Đã Xác Minh</v-chip>
                                <v-chip v-else color="warning" dark>Chưa Xác Minh</v-chip>
                            </td>

                            <!--Function-->
                            <td class="text-right">
                                <v-btn elevation="0" small icon>
                                    <v-icon>edit</v-icon>
                                </v-btn>

                                <v-btn elevation="0" color="delete" small icon>
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-sheet>

        <!--Footer-->
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    async asyncData({$axios}){
        try {
            let Get = await $axios.$post(LaptopAPI.admin.GetListOrderByType, {
                skip: 0,
                type: 1
            });

            console.log(Get)

            return {
                Orders: Get
            }
        }
        catch(e){
            return {
                Orders: []
            }
        }
    },

    methods : {

    }
}
</script>