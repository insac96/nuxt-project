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
        <v-card-text v-if="ProductsSearch">
            <v-expansion-panels accordion focusable>
                <v-expansion-panel
                    class="elevation-0"
                    v-for="(product, indexProduct) in ProductsSearch" :key="indexProduct"
                >   
                    <v-expansion-panel-header>{{ product.name }}</v-expansion-panel-header>
                    

                    <v-expansion-panel-content>
                        <v-simple-table class="Table">
                            <template v-slot:default>
                                <thead>
                                    <tr v-for="(variant, indexVariant) in product.variants" :key="indexVariant">
                                        <!-- Infor -->
                                        <td class="pl-0 py-2">
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

                                        <!-- Price -->
                                        <td>
                                            <v-chip color="primary">{{ $String.toPrice(variant.warehouse.export.price) }}đ</v-chip>
                                        </td>

                                        <!-- Discount -->
                                        <td>
                                            <v-chip :color="variant.discount.type ? 'error' : ''">
                                                <span v-if="!variant.discount.type">Không Giảm Giá</span>
                                                <span v-else> - {{ $String.toPrice(variant.discount.amount) }}đ</span>
                                            </v-chip>
                                        </td>

                                        <!-- Color -->
                                        <td class="text-right pr-0">
                                            <v-btn-toggle>
                                                <v-btn 
                                                    small dark
                                                    v-for="(warehouseColor, indexColor) in variant.warehouse.colors" :key="indexColor"    
                                                    :color="warehouseColor.information.code" fab :ripple="false"
                                                    @click="AddProductOrder(warehouseColor, indexColor, variant, product)"
                                                >
                                                    {{warehouseColor.import.amount}}
                                                </v-btn>
                                            </v-btn-toggle>
                                        </td>
                                    </tr>
                                </thead>
                            </template>
                        </v-simple-table>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';

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
                let Products = await this.$axios.$post(LaptopAPI.admin.SearchProductForOrder, {
                    key: this.NewSearch
                });

                console.log(Products);

                this.ProductsSearch = Products;
                this.Loading.search = false;
            }
            catch(e){
                this.Loading.search = false;
            }  
        },

        async AddProductOrder (warehouseColor, indexColor, variant, product) {
            this.Loading.add = true;
            
            try {
                let NewProductOrder = await this.$axios.$post(LaptopAPI.admin.AddProductOrder, {
                    order: this.order._id,
                    warehouseColor: warehouseColor._id,
                    whenOrder: {
                        amount: 1,
                        price: variant.warehouse.export.price,
                        upprice: warehouseColor.export.upprice,
                        discountAmount: variant.discount.amount
                    }
                });

                this.Loading.add = false;

                this.Update(NewProductOrder);
            }
            catch(e){
                console.log(e)
                this.Loading.add = false;
            }   
        },

        Update (NewProductOrder) {
            this.order.products.push(NewProductOrder);
            
            this.$emit('done');
            this.Cancel();
        },

        Cancel () {
            this.$emit('cancel');
        }
    }
}
</script>