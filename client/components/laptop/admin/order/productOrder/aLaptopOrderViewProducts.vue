<template>
    <!--a_laptop_order_view_product-->
    
    <div>
        <!--Main-->
        <v-card>
            <!--Header-->
            <v-sheet class="d-flex align-center justify-space-between">
                <div>
                    <v-card-title class="font-weight-bold text-h4 edit--text">Products Order</v-card-title>
                    <v-card-subtitle>Danh sách sản phẩm</v-card-subtitle>
                </div>

                <v-btn 
                    v-if="!order.done.type"
                    color="edit" dark 
                    elevation="0" class="mr-4" 
                    rounded 
                    @click="ShowProductOrderDialogAdd"
                >
                   Thêm Sản Phẩm
                </v-btn>
            </v-sheet>

            <!--Body Fetch Pending-->
            <v-card-text v-if="$fetchState.pending">
                <v-skeleton-loader type="list-item-avatar-two-line" v-for="i in 3" :key="i"></v-skeleton-loader>
            </v-card-text>

            <!--Body Fetch Error-->
            <v-card-text v-else-if="$fetchState.error" class="px-4 px-md-0">
                <v-alert type="error" class="BoxShadow"> {{$fetchState.error.message}} </v-alert>
            </v-card-text>

            <!--Body Fetch Done-->
            <div v-else>
                <!--Table-->
                <v-simple-table class="Table">
                    <template v-slot:default>
                        <!--Table Header-->
                        <thead>
                            <tr>
                                <th width="200">Thông Tin</th>
                                <th class="pl-8">Chỉ mục / Khi Order / Thực Tế</th>
                                <th class="text-right" width="120">Chức Năng</th>
                            </tr>
                        </thead>

                        <!--Table Body-->
                        <tbody>
                            <tr v-for="(product, indexProduct) of ProductOrder" :key="indexProduct">
                                <!--Info-->
                                <td class="py-2">
                                    <!--Name-->
                                    <p class="text-subtitle-1 font-weight-bold mb-0 Text-Nowap">
                                        {{product.warehouseColor.product.name}}
                                    </p>

                                    <!--Configuration-->
                                    <div class="mt-1">
                                        <v-chip small class="mb-1">{{product.warehouseColor.variant.screen}}</v-chip>
                                        <v-chip small class="mb-1">{{product.warehouseColor.variant.cpu}}</v-chip>
                                        <v-chip small class="mb-1">{{product.warehouseColor.variant.ram}}</v-chip>
                                        <v-chip small class="mb-1">{{product.warehouseColor.variant.harddrive}}</v-chip>
                                        <v-chip small class="mb-1">{{product.warehouseColor.variant.gpu}}</v-chip>
                                    </div>
                                </td>
                                
                                <!--C/K/T-->
                                <td class="py-2">
                                    <v-simple-table>
                                        <tbody>
                                            <!--Amount-->
                                            <tr>
                                                <td class="text-subtitle-1">Số Lượng</td>
                                                <td class="text-center"><v-chip>{{ product.whenOrder.amount }}</v-chip></td>
                                                <td class="text-center">
                                                    <v-chip color="edit" dark>{{ product.warehouseColor.import.amount }}</v-chip>
                                                </td>
                                            </tr>
                                            
                                            <!--Price-->
                                            <tr>
                                                <td class="text-subtitle-1">Giá Bán</td>
                                                <td class="text-center"><v-chip>{{ $String.toPrice(product.whenOrder.price) }}</v-chip></td>
                                                <td class="text-center">
                                                    <v-chip color="edit" dark>{{ $String.toPrice(product.warehouseColor.warehouse.export.price) }}</v-chip>
                                                </td>
                                            </tr>

                                            <!--Color Up Price-->
                                            <tr>
                                                <td class="text-subtitle-1">Tăng Giá</td>
                                                <td class="text-center"><v-chip>{{ $String.toPrice(product.whenOrder.upprice) }}</v-chip></td>
                                                <td class="text-center">
                                                    <v-chip color="edit" dark>{{ $String.toPrice(product.warehouseColor.export.upprice) }}</v-chip>
                                                </td>
                                            </tr>

                                            <!--Discount Amount-->
                                            <tr>
                                                <td class="text-subtitle-1">Giảm Giá</td>
                                                <td class="text-center"><v-chip>{{ $String.toPrice(product.whenOrder.discountAmount) }}</v-chip></td>
                                                <td class="text-center">
                                                    <v-chip color="edit" dark>{{ $String.toPrice(product.warehouseColor.variant.discount.amount) }}</v-chip>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </v-simple-table>
                                </td>

                                <!--Function-->
                                <td class="text-right">
                                    <v-btn 
                                        elevation="0" 
                                        small icon 
                                        :disabled="order.done.type"
                                        @click="ShowProductOrderDialogEdit(product)"
                                    >
                                        <v-icon>edit</v-icon>
                                    </v-btn>

                                    <v-btn 
                                        elevation="0" color="delete" 
                                        small icon 
                                        :loading="Loading.delete"
                                        :disabled="order.done.type"
                                        @click="DeleteProductOrder(product, indexProduct)"
                                    >
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>

                <!--If List Orders Empty-->
                <v-alert
                    v-if="ProductOrder.length < 1" 
                    class="mb-0" tile
                >
                    Không có sản phẩm nào hiển thị
                </v-alert>

                <!--Total-->
                <v-sheet v-else class="d-flex align-center justify-space-between px-4 py-2 text-h6" color="heading">
                    <span>Total:</span>
                    <span class="font-weight-bold error--text">{{ $String.toPrice(Total()) }}đ</span>
                </v-sheet>
            </div>
        </v-card>

        <!--Dialog-->
        <div>
            <!--Dialog Product Order Edit-->
            <v-dialog v-model="ProductOrderDialog.edit.type" persistent max-width="500">
                <ALaptopOrderViewProductEdit 
                    @cancel="ProductOrderDialog.edit.type = false" 
                    :product="ProductOrderDialog.edit.select"
                ></ALaptopOrderViewProductEdit>
            </v-dialog>

            <!--Dialog Product Order Add-->
            <v-dialog v-model="ProductOrderDialog.add.type" max-width="700">
                <ALaptopOrderViewProductAdd 
                    @done="$fetch()"
                    @cancel="ProductOrderDialog.add.type = false" 
                    :order="ProductOrderDialog.add.order"
                ></ALaptopOrderViewProductAdd>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';

export default {
    props : ['order'],

    data () {
        return {
            ProductOrder: null,
            Loading: {
                edit: false,
                delete: false
            },
            ProductOrderDialog: {
                edit: {
                    type: false,
                    select: null
                },
                add: {
                    type: false,
                    order: null
                }
            }
        }
    },

    async fetch () {
        try {
            let Products = await this.$axios.$post(LaptopAPI.admin.GetListProductOrder, {
                order: this.order._id
            });

            this.ProductOrder = Products;
        }
        catch(e){
            this.ProductOrder = [];
        }
    },

    fetchOnServer: false,

    watch: {
        order (newVal) {
            this.$fetch();
        }
    },

    methods : {
        async DeleteProductOrder (product, indexProduct) {
            this.Loading.delete = true;
            
            try {
                let Delete = await this.$axios.$post(LaptopAPI.admin.DeleteProductOrder, {
                    _id: product._id
                });

                this.Loading.delete = false;

                this.$delete(this.ProductOrder, indexProduct);

                let indexProductInOrder = this.order.products.findIndex(e => e._id == product._id);
                this.$delete(this.order.products, indexProductInOrder);
            }
            catch(e){
                this.Loading.delete = false;
            }   
        },

        Total () {
            let price = 0;

            this.ProductOrder.forEach(item => {
                price = price + ((item.whenOrder.price - item.whenOrder.discountAmount + item.whenOrder.upprice) * item.whenOrder.amount)
            });

            return price;
        },

        ShowProductOrderDialogEdit (productSelect) {
            this.ProductOrderDialog.edit.select = productSelect;

            this.ProductOrderDialog.edit.type = true;
        },

        ShowProductOrderDialogAdd () {
            this.ProductOrderDialog.add.order = this.order;

            this.ProductOrderDialog.add.type = true;
        },
    },
}
</script>