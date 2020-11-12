<template>
    <div>
        <!--Button-->
        <v-badge 
            class="CartFixed" color="primary" 
            overlap left 
            bordered
            :content="LaptopStore.cart.length" 
            :value="LaptopStore.cart.length"
        >
            <v-btn fab color="primary" @click="DialogCart = true"><v-icon>shopping_cart</v-icon></v-btn>
        </v-badge>

        <!--Box Bottom-->
        <v-bottom-sheet v-model="DialogCart" width="800">
            <v-card flat tile v-intersect="onIntersect">
                <!--Header-->
                <v-sheet color="heading">
                    <v-card-title class="font-weight-bold text-h5 primary--text">Cart</v-card-title>
                    <v-card-subtitle>Thông tin các sản phẩm trong giỏ hàng</v-card-subtitle>
                </v-sheet>

                <!--Loading-->
                <v-card-text v-if="Loading.get" flat tile>
                    <v-skeleton-loader type="list-item-avatar-two-line" v-for="i in 3" :key="i"></v-skeleton-loader>
                </v-card-text>

                <!--End Loading-->
                <v-card-text v-else class="OverflowY pt-4">
                    <!--List is Empty-->
                    <v-alert v-if="ListProduct.length < 1" type="info" border="left" color="primary" class="mb-0">
                        Không có sản phẩm nào trong giỏ hàng
                    </v-alert>

                    <!--Else-->
                    <v-sheet v-for="(item, index) in ListProduct" :key="index" class="d-flex mb-2">
                        <!--Image-->
                        <v-img :src="$Image.Get(item.product.images[0], 'm')" max-width="90" max-height="60" class="mt-2">
                        </v-img>

                        <div class="ml-2" style="width: 100%;">
                            <!--Name-->
                            <p class="text-subtitle-1 font-weight-bold mb-0 Text-Nowap">
                                {{item.product.name}}
                            </p>

                            <!--Configuration-->
                            <div class="mt-1">
                                <v-chip small class="mb-1">{{item.variant.screen}}</v-chip>
                                <v-chip small class="mb-1">{{item.variant.cpu}}</v-chip>
                                <v-chip small class="mb-1">{{item.variant.ram}}</v-chip>
                                <v-chip small class="mb-1">{{item.variant.harddrive}}</v-chip>
                                <v-chip small class="mb-1">{{item.variant.gpu}}</v-chip>
                            </div>

                            <!--Color-->
                            <div class="mt-1 d-flex align-center">
                                <span class="mr-2">Color: </span>
                                <v-btn :color="item.information.code" width="24" height="24" fab elevation="0" class="mr-1"></v-btn>
                                <v-chip small color="primary" v-if="item.export.upprice > 0">
                                    + {{$String.toPrice(item.export.upprice)}}
                                </v-chip>
                            </div>
                            
                            <!--Price and Amount-->
                            <v-row align="center" no-gutters class="mt-2">
                                <!--Price-->
                                <v-col cols="12" sm="6" class="text-right text-sm-left">
                                    <span 
                                        v-if="item.variant.discount.type" 
                                        class="text-subtitle-1 text-decoration-line-through grey--text mr-2"
                                    >
                                        {{$String.toPrice(item.warehouse.export.price * item.amount)}}
                                    </span>

                                    <span class="text-subtitle-1 error--text font-weight-bold">
                                        {{$String.toPrice((item.warehouse.export.price - item.variant.discount.amount + item.export.upprice) * item.amount)}}
                                    </span>
                                </v-col>

                                <!--Select Amount-->
                                <v-col cols="12" sm="6" class="d-flex justify-end mt-1 mt-sm-0">
                                    <v-btn small elevation="0" tile class="pa-0" @click="MinusAmount(item, index)">
                                        <v-icon small>remove</v-icon>
                                    </v-btn>

                                    <v-btn small disabled tile class="font-weight-bold text-subtitle-1">{{item.amount}}</v-btn>

                                    <v-btn small elevation="0" tile class="pa-0" @click="AddAmount(item)">
                                        <v-icon small>add</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <v-divider class="my-2" v-if="(index + 1) != ListProduct.length"></v-divider>
                        </div>
                    </v-sheet>
                </v-card-text>

                <!--Footer-->
                <v-card-actions v-if="ListProduct.length > 0" class="px-4 heading">
                    <div class="text-h6 text-sm-h5">
                        <span>Total:</span>
                        <span class="font-weight-bold error--text">{{$String.toPrice(Total)}}đ</span>
                    </div>

                    <v-spacer></v-spacer>
                    <v-btn color="primary" elevation="0" tile>Đặt Hàng</v-btn>
                </v-card-actions>
            </v-card>
        </v-bottom-sheet>
    </div>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    data () {
        return {
            ListProduct: [],
            DialogCart: false,
            Loading: {
                get: true
            }
        }
    },

    computed: {
        LaptopStore () {
            return this.$store.state.laptop;
        },
        Total () {
            let price = 0;

            this.ListProduct.forEach(item => {
                price = price + ((item.warehouse.export.price - item.variant.discount.amount + item.export.upprice) * item.amount)
            });

            return price;
        }
    },

    methods: {
        //OBserver
        onIntersect (entries, observer) {
            let isIntersecting = entries[0].isIntersecting
            if(!isIntersecting) return false;

            this.GetCart();
        },

        async GetCart () {
            this.Loading.get = true;

            if(this.LaptopStore.cart.length < 1) return this.Loading.get = false;

            let ListID = this.LaptopStore.cart.map(item => {
                return item.color
            });

            try {
                let Get = await this.$axios.$post(LaptopAPI.guest.GetListItemInCart, ListID);

                Get.map(item => {
                    let indexItem = this.LaptopStore.cart.findIndex(e => e.color == item._id);

                    if(indexItem < 0){
                        item.amount = 1;
                        return item;
                    }

                    item.amount = this.LaptopStore.cart[indexItem].amount;
                    return item;
                });

                this.ListProduct = Get;
                this.Loading.get = false;
            }
            catch (e) {
                this.Loading.get = false;
            }
        },

        AddAmount (item) {
            if(item.amount == item.import.amount) return false;
            item.amount++;
        },

        MinusAmount (item, index) {
            if(item.amount > 1) return item.amount--;

            this.$delete(this.ListProduct, index);
            this.$store.commit('laptop/removeInCart', {
                color: item._id
            });
        }
    }
}
</script>

<style>
    .CartFixed {
        position: fixed !important;
        bottom: 10px;
        right: 10px;
        z-index: 10;
    }

    .OverflowY {
        max-height: 45vh !important;
        overflow-y: auto !important;
    }
</style>