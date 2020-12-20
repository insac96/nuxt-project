<template>
    <!--Laptop Product Index-->

    <div>
        <!--Main-->
        <v-card tile flat>
            <!--Header-->
            <div class="d-flex align-center">
                <!--Header Left-->
                <div>
                    <v-card-title class="font-weight-bold text-h4 primary--text">Products</v-card-title>
                    <v-card-subtitle>Danh sách các sản phẩm</v-card-subtitle>
                </div>

                <v-spacer></v-spacer>

                <!--Header Right (Button Create New Product)-->
                <v-btn 
                    color="primary" dark 
                    rounded elevation="0" large class="mr-4"
                    to="product/create"
                >
                    <v-icon>add</v-icon>
                    Thêm Mới
                </v-btn>
            </div>

            <!--Fetch Pendding-->
            <div v-if="$fetchState.pending || $fetchState.error">
                <v-alert type="error" color="error" tile v-if="$fetchState.error">{{ $fetchState.error.message }}</v-alert>
                
                <v-skeleton-loader type="table"></v-skeleton-loader>
            </div>

            <!--Fetch Done-->
            <div v-else>
                <!--Option Search-->
                <v-sheet class="d-flex align-center pa-3" color="heading">
                    <!--Input Search-->
                    <div>
                        <v-text-field
                            v-model="KeySearch"
                            outlined dense rounded
                            placeholder="Tìm theo tên sản phẩm"
                            append-icon="search"
                            color="primary"
                            hide-details
                            autocomplete="off"
                            @keyup="ShowProductByQuery"
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
                                    color="primary" outlined
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
                                    color="primary" outlined
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
                <v-simple-table class="Table">
                    <template v-slot:default>
                        <!--Table Header-->
                        <thead>
                            <tr>
                                <th width="100">Hãng</th>
                                <th>Tên Sản Phẩm</th>
                                <th class="text-center" width="150">Thương Hiệu</th>
                                <th class="text-center" width="120">Cấu Hình</th>
                                <th class="text-right" width="150">Chức Năng</th>
                            </tr>
                        </thead>

                        <!--Table Body-->
                        <tbody>
                            <tr v-for="(product, indexProduct) in ListProduct" :key="indexProduct">
                                <!--1 - Company Name-->
                                <td class="text-uppercase"><v-chip>{{ product.company.name }}</v-chip></td>

                                <!--2 - Product Name-->
                                <td>
                                    <nuxt-link
                                        :to="`/admin/laptop/product/${product.link}/information`"
                                    >
                                        {{ product.name }}
                                    </nuxt-link>
                                </td>

                                <!--3 - Trademark-->
                                <td class="text-center text-uppercase"><v-chip>{{ product.trademark.name }}</v-chip></td>

                                <!--4 - Varian Count-->
                                <td class="text-center"><v-chip>{{ product.variantCount }}</v-chip></td>

                                <!--5 - Funtion-->
                                <td class="text-right">
                                    <v-btn 
                                        :color="product.visibility ? 'primary' : 'grey'" 
                                        icon small elevation="0"
                                        :disabled="Loading.visibility"
                                        @click="EditVisibilityProduct(product)"
                                    >
                                        <v-icon>{{product.visibility ? 'visibility' : 'visibility_off'}}</v-icon>
                                    </v-btn>

                                    <v-btn
                                        color="error"
                                        icon small elevation="0"  
                                        @click="ShowDialogDeleteProduct(indexProduct, product)"
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
                    v-if="ListProduct.length < 1" 
                    class="mb-0" tile
                >
                    Không có sản phẩm nào hiển thị
                </v-alert>

                <!--Body Footer-->
                <v-sheet class="d-flex justify-space-between align-center py-2 px-4" color="heading">
                    <!--Count-->
                    <v-chip> 
                        <span>{{ListProduct.length}} / {{CountProduct}}</span>
                    </v-chip>

                    <!--Button Next Previous-->
                    <v-btn 
                        elevation="0" rounded 
                        color="primary"
                        v-if="(ListProduct.length < CountProduct)" 
                        @click="ShowProductByQuery('more');"
                    >
                        More
                    </v-btn>
                </v-sheet>
            </div>
        </v-card>

        <!--Dialog-->
        <div>
            <!--Dialog Delete-->
            <v-dialog v-model="Dialog.delete.type" persistent max-width="450">
                <ALaptopProductDelete 
                    @delete="DeleteProductDone"
                    @cancel="Dialog.delete.type = false" 
                    :product="Dialog.delete.select"
                ></ALaptopProductDelete>
            </v-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            Companyes: [],
            ListProduct: null,
            CountProduct: null,

            KeySearch: null,
            ComanySelectShow: null,
            TrademarkSelectShow: null,

            Dialog: {
                delete: {
                    type: false,
                    index: null,
                    select: null
                }
            },

            Loading: {
                visibility: false
            }
        }
    },

    async fetch(){
        try {
            let Get = await this.$axios.$post(this.$api.laptop.admin.GetListProduct, {
                skip: 0
            });

            this.ListProduct = Get.products;
            this.CountProduct = Get.countProduct;
        }
        catch(e){
            throw new Error(e.toString());
        }
    },

    fetchOnServer: false,

    methods : {
        //Get Companyes
        async GetCompanyes () {
            if(this.Companyes.length > 0) return false;

            try {
                let Companyes = await this.$axios.$get(this.$api.laptop.admin.GetListCompanyInfo);

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
                let Search = await this.$axios.$post(this.$api.laptop.admin.GetListProduct, {
                    skip: (type === 'more') ? this.Products.length : 0,
                    company: this.ComanySelectShow ? this.ComanySelectShow._id : null,
                    trademark: this.TrademarkSelectShow ? this.TrademarkSelectShow._id : null,
                    keySearch: this.KeySearch ? this.$String.toConvert(this.KeySearch, '-') : this.KeySearch,
                });

                if(type === 'more') return this.Products = this.Products.concat(Search.products);

                this.ListProduct = Search.products;
                this.CountProduct = Search.countProduct;
            }
            catch(e){
                return false;
            }
        },

        //Delete
        ShowDialogDeleteProduct (index, product) {
            this.Dialog.delete.type = true;
            this.Dialog.delete.index = index;
            this.Dialog.delete.select = product;
        },

        //Delete Done
        DeleteProductDone () {
            this.$delete(this.ListProduct, this.Dialog.delete.index);
            this.Count--;
        },

        //Change Visibility
        async EditVisibilityProduct (product) {
            this.Loading.visibility = true;

            product.visibility = !product.visibility;

            try {
                let Change = await this.$axios.$post(this.$api.laptop.admin.EditVisibilityProduct, {
                    _id: product._id,
                    visibility: product.visibility
                });

                this.Loading.visibility = false;
            }
            catch(e){
                product.visibility = !product.visibility;
                this.Loading.visibility = false;
            }
        }
    }
}
</script>