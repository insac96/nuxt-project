<template>
    <!--Laptop Product Index-->

    <v-card tile flat class="BoxShadow">
        <!--Header-->
        <v-sheet class="d-flex justify-space-between align-center">
            <div>
                <v-card-title class="font-weight-bold text-h4 primary_admin--text">Products</v-card-title>
                <v-card-subtitle>Danh sách các sản phẩm</v-card-subtitle>
            </div>

            <v-btn 
                color="primary_admin" dark 
                tile elevation="0" large class="mr-4"
                to="/admin/laptop/product/create"
            >
                <v-icon>add</v-icon>
                Thêm Mới
            </v-btn>
        </v-sheet>

        <!--Body-->
        <v-sheet>
            <!--Option Search-->
            <v-sheet class="d-flex align-center pa-3" color="heading_admin">
                <!--Input Search-->
                <div>
                    <v-text-field
                        v-model="KeySearchShow"
                        outlined dense rounded
                        placeholder="Tìm theo tên sản phẩm"
                        append-icon="search"
                        color="primary_admin"
                        hide-details
                        autocomplete="off"
                        @click:append="ShowProductByQuery"
                        @change="ShowProductByQuery"
                    ></v-text-field>
                </div>

                <v-spacer></v-spacer>

                <!--Button Select Company and Traademark-->
                <div>
                    <!--Company-->
                    <v-menu offset-y min-width="170" nudge-bottom="5">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn 
                                height="40" 
                                color="primary_admin" outlined
                                rounded elevation="0" class="pr-2"
                                @click="GetCompanyes"
                                v-bind="attrs" v-on="on"
                            >
                                {{ComanySelectShow ? ComanySelectShow.name : 'All Comanyes'}}
                                <v-icon class="ml-1">arrow_drop_down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="SetComanySelect(null)">
                                <v-list-item-title>Show All</v-list-item-title>
                            </v-list-item>

                            <v-list-item
                                v-for="(company, index) in Companyes" :key="index"
                                @click="SetComanySelect(company)"
                            >
                                <v-list-item-title>{{ company.name }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <!--Trademark-->
                    <v-menu offset-y min-width="170" nudge-bottom="5">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn 
                                :disabled="!ComanySelectShow"
                                height="40"
                                color="primary_admin" outlined
                                rounded elevation="0" class="pr-2"
                                v-bind="attrs" v-on="on"
                            >
                                {{TrademarkSelectShow ? TrademarkSelectShow.name : 'All Trademarks'}}
                                <v-icon class="ml-1">arrow_drop_down</v-icon>
                            </v-btn>
                        </template>

                        <v-list v-if="ComanySelectShow">
                            <v-list-item @click="SetTrademarkSelect(null)">
                                <v-list-item-title>Show All</v-list-item-title>
                            </v-list-item>

                            <v-list-item
                                v-for="(trademark, index) in ComanySelectShow.trademarks" :key="index"
                                @click="SetTrademarkSelect(trademark)"
                            >
                                <v-list-item-title>{{ trademark.name }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-sheet>

            <!--Table-->
            <v-simple-table class="Table_Laptop">
                <template v-slot:default>
                    <!--Table Header-->
                    <thead>
                        <tr class="TR THead">
                            <th class="TH" width="100">Hãng</th>
                            <th class="TH">Tên Sản Phẩm</th>
                            <th class="TH text-center" width="150">Thương Hiệu</th>
                            <th class="TH text-center" width="120">Cấu Hình</th>
                            <th class="TH text-right" width="150">Chức Năng</th>
                        </tr>
                    </thead>

                    <!--Table Body-->
                    <tbody>
                        <tr v-for="(product, indexProduct) in Products" :key="indexProduct" class="TR TR_Hover">
                            <!--1 - Company Name-->
                            <td class="TD text-uppercase">{{ product.company ? product.company.name : 'Null' }}</td>

                            <!--2 - Product Name-->
                            <td class="TD">
                                <nuxt-link
                                    :to="`/admin/laptop/product/${product.link}/Information`"
                                >
                                    {{ product.name }}
                                </nuxt-link>
                            </td>

                            <!--3 - Trademark-->
                            <td class="TD text-center text-uppercase">{{ product.trademark.name }}</td>

                            <!--4 - Varian Count-->
                            <td class="TD text-center">{{ product.variantCount }}</td>

                            <!--5 - Funtion-->
                            <td class="TD text-right">
                                <v-btn 
                                    :color="product.visibility ? 'primary_admin' : 'grey'" 
                                    icon small elevation="0"
                                    @click="EditVisibilityProduct(product)"
                                >
                                    <v-icon>{{product.visibility ? 'visibility' : 'visibility_off'}}</v-icon>
                                </v-btn>

                                <v-btn
                                    color="error"
                                    icon small elevation="0"  
                                    @click="ShowDialogDeleteProduct(indexProduct)"
                                >
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <!--If List Product Empty-->
            <v-alert
                v-if="Products.length < 1" 
                class="mb-0" tile
            >
                Không có sản phẩm nào hiển thị
            </v-alert>

            <!--Body Footer-->
            <v-sheet class="d-flex justify-space-between align-center py-2 px-4" color="heading_admin">
                <!--Count-->
                <v-chip> 
                    <span>{{Products.length}} / {{Count}}</span>
                </v-chip>

                <!--Button Next Previous-->
                <v-btn 
                    elevation="0" rounded 
                    color="primary_admin"
                    v-if="(Products.length < Count)" 
                    @click="ShowProductByQuery('more');"
                >
                    More
                </v-btn>
            </v-sheet>
        </v-sheet>

        <!--Dialog Delete-->
        <v-dialog v-model="Dialog.delete.type" persistent max-width="450">
            <ALaptopProductDelete 
                @done="DeleteProductDone"
                @cancel="Dialog.delete.type = false" 
                :product="Dialog.delete.select"
            ></ALaptopProductDelete>
        </v-dialog>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    async asyncData({$axios}){
        try {
            let Get = await $axios.$post(LaptopAPI.admin.GetAllProduct, {
                skip: 0
            });
            return {
                Products: Get.products,
                Count: Get.count
            }
        }
        catch(e){
            return {
                Products: []
            }
        }
    },

    data () {
        return {
            Companyes: [],

            KeySearchShow: null,
            ComanySelectShow: null,
            TrademarkSelectShow: null,

            Dialog: {
                delete: {
                    type: false,
                    index: null,
                    select: null
                }
            }
        }
    },

    methods : {
        //Get Companyes
        async GetCompanyes () {
            if(this.Companyes.length > 0) return false;

            try {
                let Companyes = await this.$axios.$get(LaptopAPI.admin.GetAllMiniCompany);

                this.Companyes = this.Companyes.concat(Companyes);
            }
            catch(e){
                return false;
            }
        },

        //Set Query
        SetComanySelect (company) {
            this.ComanySelectShow = company;
            
            if(!company){
                this.TrademarkSelectShow = null;
            }

            this.ShowProductByQuery();
        },

        SetTrademarkSelect (trademark) {
            this.TrademarkSelectShow = trademark;

            this.ShowProductByQuery();
        },

        //Search
        async ShowProductByQuery (type) {
            try {
                let Search = await this.$axios.$post(LaptopAPI.admin.GetAllProduct, {
                    skip: (type === 'more') ? this.Products.length : 0,
                    company: this.ComanySelectShow ? this.ComanySelectShow._id : null,
                    trademark: this.TrademarkSelectShow ? this.TrademarkSelectShow._id : null,
                    key: this.KeySearchShow ? this.KeySearchShow : null,
                });

                if(type === 'more') return this.Products = this.Products.concat(Search.products);

                this.Products = Search.products;
                this.Count = Search.count;
            }
            catch(e){
                return false;
            }
        },

        //Delete
        ShowDialogDeleteProduct (index) {
            this.Dialog.delete.type = true;
            this.Dialog.delete.index = index;
            this.Dialog.delete.select = this.Products[index];
        },

        //Delete Done
        DeleteProductDone () {
            this.$delete(this.Products, this.Dialog.delete.index);
            this.Count--;
        },

        //Change Visibility
        async EditVisibilityProduct (product) {
            try {
                let Change = await this.$axios.$post(LaptopAPI.admin.EditVisibilityProduct, product);

                product.visibility = !product.visibility;
            }
            catch(e){
                return false;
            }
        }
    }
}
</script>