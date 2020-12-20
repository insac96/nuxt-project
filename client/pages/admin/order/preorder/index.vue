<template>
    <!--Admin Delivery Order Page-->

    <div>
        <!--Main-->
        <v-card tile flat>
            <!--Header-->
            <v-card-title class="font-weight-bold text-h4 primary--text">Pre-Order</v-card-title>
            <v-card-subtitle>Danh sách đơn nhận tại cửa hàng</v-card-subtitle>

            <!--Fetch Pendding-->
            <div v-if="$fetchState.pending || $fetchState.error">
                <v-alert type="error" color="error" tile v-if="$fetchState.error">{{ $fetchState.error.message }}</v-alert>
                
                <v-skeleton-loader type="table"></v-skeleton-loader>
            </div>

            <!--Fetch Done-->
            <div v-else>
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
                            <tr v-for="(order, indexOrder) of ListOrder" :key="indexOrder">
                                <!--User Info-->
                                <td class="py-2">
                                    <div class="font-weight-bold">
                                        <span>{{ order.vendor.name }} - </span>
                                        <span class="primary--text">{{ order.vendor.phone }}</span>
                                    </div>
                                    <div class="text-subtitle-1 grey--text">{{ order.vendor.address }}</div>
                                </td>

                                <!--Date Create-->
                                <td class="text-center font-weight-medium">
                                    {{ $dayjs(order.create).format('DD/MM/YYYY') }}
                                </td>

                                <!--Products-->
                                <td class="text-center font-weight-medium">
                                    <v-chip @click="ShowOrderDialogViewProduct(order)">{{ order.products.length }}</v-chip>
                                </td>

                                <!--Pay-->
                                <td class="text-center">
                                    <v-chip v-if="order.pay == 2" color="info" dark>Đã Thanh Toán</v-chip>
                                    <v-chip v-if="order.pay == 1">Chưa Thanh Toán</v-chip>
                                </td>

                                <!--Status-->
                                <td class="text-center font-weight-medium">
                                    <v-chip v-if="order.done.type" color="info" dark>Hoàn Thành</v-chip>

                                    <div v-else>
                                        <v-chip 
                                            v-if="order.verification.type" 
                                            :color="order.verification.status ? 'error' : 'teal'" 
                                            dark 
                                            @click="ShowOrderDialogStatus(order)"
                                        >
                                            {{ order.verification.status ? order.verification.status : 'Đã Xác Minh' }}
                                        </v-chip>
                                        <v-chip v-else color="warning" dark @click="ShowOrderDialogStatus(order)">Chưa Xác Minh</v-chip>
                                    </div>
                                </td>

                                <!--Function-->
                                <td class="text-right">
                                    <v-btn 
                                        elevation="0" small icon 
                                        :disabled="order.done.type"
                                        @click="ShowOrderDialogInformation(order)"
                                    >
                                        <v-icon>edit</v-icon>
                                    </v-btn>

                                    <v-btn 
                                        elevation="0" color="delete" small icon 
                                        
                                        @click="ShowOrderDialogDelete(order, indexOrder)"
                                    >
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>

                <!--If List Order Empty-->
                <v-alert
                    v-if="ListOrder.length < 1" 
                    class="mb-0" tile
                >
                    Không có đơn hàng nào hiển thị
                </v-alert>
            </div>
        </v-card>

        <!--Dialog-->
        <div>
            <!--Dialog Delete Order-->
            <v-dialog v-model="OrderDialog.delete.type" persistent max-width="450">
                <AOrderDelete 
                    @delete="$delete(Orders, OrderDialog.delete.index)"
                    @cancel="OrderDialog.delete.type = false" 
                    :order="OrderDialog.delete.select"
                ></AOrderDelete>
            </v-dialog>

            <!--Dialog Edit Information Order-->
            <v-dialog v-model="OrderDialog.information.type" persistent max-width="450">
                <AOrderInformation 
                    @cancel="OrderDialog.information.type = false" 
                    :order="OrderDialog.information.select"
                ></AOrderInformation>
            </v-dialog>

            <!--Dialog Verification Order-->
            <v-dialog v-model="OrderDialog.verification.type" persistent max-width="450">
                <AOrderStatus 
                    @cancel="OrderDialog.verification.type = false" 
                    :order="OrderDialog.verification.select"
                ></AOrderStatus>
            </v-dialog>

            <!--Dialog View Product Order-->
            <v-dialog v-model="OrderDialog.viewProduct.type" max-width="800">
                <AOrderViewProducts 
                    @cancel="OrderDialog.viewProduct.type = false" 
                    :order="OrderDialog.viewProduct.select"
                ></AOrderViewProducts>
            </v-dialog>
            
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            ListOrder: null,

            OrderDialog : {
                information: {
                    type: false,
                    select: null
                },
                delete: {
                    type: false,
                    index: null,
                    select: null
                },
                verification: {
                    type: false,
                    select: null
                },
                viewProduct : {
                    type: false,
                    select: null
                }
            }
        }
    },

    async fetch(){
        try {
            let Get = await this.$axios.$post(this.$api.laptop.admin.GetListOrderByType, {
                skip: 0,
                type: 2
            });

            this.ListOrder = Get;
        }
        catch(e){
            throw new Error(e.toString());
        }
    },

    fetchOnServer: false,

    methods : {
        ShowOrderDialogInformation (orderSelect) {
            this.OrderDialog.information.select = orderSelect;

            this.OrderDialog.information.type = true;
        },
        ShowOrderDialogDelete (orderSelect, index) {
            this.OrderDialog.delete.index = index;
            this.OrderDialog.delete.select = orderSelect;

            this.OrderDialog.delete.type = true;
        },
        ShowOrderDialogStatus (orderSelect) {
            this.OrderDialog.verification.select = orderSelect;

            this.OrderDialog.verification.type = true;
        },
        ShowOrderDialogViewProduct (orderSelect) {
            this.OrderDialog.viewProduct.select = orderSelect;

            this.OrderDialog.viewProduct.type = true;
        },
    }
}
</script>