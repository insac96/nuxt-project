<template>
    <!--a_laptop_order_view_product_add-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 create--text">Add Product Order</v-card-title>
        <v-card-subtitle>Thêm sản phẩm vào đơn hàng</v-card-subtitle>

        <!--Search-->
        <v-form class="px-6" ref="form" v-model="Validate" v-on:submit.prevent="Search">
            <v-text-field
                v-model="NewSearch"
                :rules="[ $Rules.required ]"
                label="Search"
                filled rounded
                placeholder="Tìm kiếm theo tên sản phẩm"
                append-icon="search"
                color="create"
                autocomplete="off"
                :disabled="Loading.search"
                @click:append="Search"
            >
            </v-text-field>
        </v-form>

        <!--List Product Search-->
        <v-expansion-panels accordion focusable v-if="ProductsSearch">
            <v-expansion-panel v-for="(product, indexProduct) in ProductsSearch" :key="indexProduct">
                <v-expansion-panel-header>{{ product.name }}</v-expansion-panel-header>
                
                <v-expansion-panel-content>
                    <v-simple-table class="Table">
                        <template v-slot:default>
                            <thead>
                                <tr v-for="(variant, indexVariant) in product.variants" :key="indexVariant">
                                    <!-- Infor -->
                                    <td class="pl-0 py-2" width="250">
                                        <!--Code-->
                                        <p class="text-subtitle-1 font-weight-bold mb-0 Text-Nowap">
                                            {{variant.code}}
                                        </p>

                                        <!--Configuration-->
                                        <div class="mt-1">
                                            <v-chip small class="mb-1">{{variant.screen}}</v-chip>
                                            <v-chip small class="mb-1">{{variant.cpu}}</v-chip>
                                            <v-chip small class="mb-1">{{variant.ram}}</v-chip>
                                            <v-chip small class="mb-1">{{variant.harddrive}}</v-chip>
                                            <v-chip small class="mb-1">{{variant.gpu}}</v-chip>
                                        </div>
                                    </td>

                                    <!-- Discount -->
                                    <td width="150">
                                        <v-chip :color="variant.discount.type ? 'error' : ''">
                                            <span v-if="!variant.discount.type">Không Giảm Giá</span>
                                            <span v-else> - {{ $String.toPrice(variant.discount.amount) }}đ</span>
                                        </v-chip>
                                    </td>

                                    <!-- Color -->
                                    <td class="text-right pr-0">
                                        <div v-for="(warehouse, indexWarehouse) in variant.warehouses" :key="indexWarehouse">
                                            <v-menu 
                                                v-for="(warehouseColor, indexColor) in warehouse.colors" :key="indexColor"
                                                offset-y :nudge-width="250"
                                                left :nudge-bottom="10"
                                            >   
                                                <!-- Menu Button -->
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn 
                                                        small dark fab x-small 
                                                        :ripple="false" elevation="0"
                                                        :color="warehouseColor.information.code"
                                                        v-on="on"
                                                        v-bind="attrs"
                                                    ></v-btn>
                                                </template>

                                                <!-- Menu Body -->
                                                <v-card>
                                                    <v-card-text class="d-flex justify-space-between align-center py-3">
                                                        <span class="text-subtitle-1 font-weight-bold">Số Lượng</span>
                                                        <v-chip>{{warehouseColor.import.amount}}</v-chip>
                                                    </v-card-text>

                                                    <v-card-text class="d-flex justify-space-between align-center py-3">
                                                        <span class="text-subtitle-1 font-weight-bold">Giá Bán</span>
                                                        <v-chip>{{ $String.toPrice(warehouse.export.price) }}đ</v-chip>
                                                    </v-card-text>

                                                    <v-card-actions class="px-4">
                                                        <v-btn 
                                                            rounded block
                                                            color="primary"
                                                            elevation="0"
                                                            @click="AddProductOrder(warehouseColor)"
                                                        >Thêm Sản Phẩm</v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-menu>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                        </template>
                    </v-simple-table>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>

<script>
export default {
    props : ['order'],

    data () {
        return {
            Validate: true,
            NewSearch: null,
            ProductsSearch: null,
            Loading: {
                add: false,
                search: false
            }
        }
    },

    methods: {
        async Search () {
            if(!this.$refs.form.validate()) return false;

            this.Loading.search = true;
            
            try {
                let Products = await this.$axios.$post(this.$api.laptop.admin.SearchProductForOrder, {
                    key: this.NewSearch
                });

                this.ProductsSearch = Products;
                this.Loading.search = false;
            }
            catch(e){
                this.Loading.search = false;
            }  
        },

        async AddProductOrder (warehouseColor) {
            this.Loading.add = true;
            
            try {
                let NewProductOrder = await this.$axios.$post(this.$api.laptop.admin.AddProductOrder, {
                    order: this.order._id,
                    warehouseColor: warehouseColor._id,
                });

                this.Update(NewProductOrder);
                warehouseColor.import.amount --;

                this.Loading.add = false;
            }
            catch(e){
                this.Loading.add = false;
            }   
        },

        Update (NewProductOrder) {
            this.order.products.push(NewProductOrder);

            this.$store.commit('dialogStatus/show', {
                text: 'Đã Thêm Sản Phẩm Vào Đơn Hàng',
                actionClose: this.DoneOrder
            });
            
            this.$emit('update');
        }
    }
}
</script>