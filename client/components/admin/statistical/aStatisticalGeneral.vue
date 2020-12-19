<template>
    <!--a_statistical_general-->

    <v-card tile flat>
        <!--Header-->
        <v-sheet class="px-4 py-2" color="heading">
            <span class="text-h5 heading_text--text font-weight-bold">General</span>
        </v-sheet>

        <!--Fetch Pendding-->
        <v-card-text v-if="$fetchState.pending || $fetchState.error">
            <v-alert type="error" color="error" class="BoxShadow" v-if="$fetchState.error">{{ $fetchState.error.message }}</v-alert>
            
            <v-row dense>
                <v-col cols="4" v-for="i in 6" :key="i">
                    <v-skeleton-loader type="image" height="120" class="BoxShadow"></v-skeleton-loader>
                </v-col>
            </v-row>
        </v-card-text>

        <!--Fetch Done-->
        <v-row v-else class="pa-4" dense>
            <!--Price Revenue-->
            <v-col cols="4">
                <v-card class="BoxShadow" color="teal" dark>
                    <v-card-title class="pb-1 pt-6">
                        <span class="title font-weight-light">DOANH THU</span>
                    </v-card-title>

                    <v-card-text class="font-weight-bold text-h4 pb-5">
                        {{$String.toPrice(PriceRevenue)}}
                    </v-card-text>
                </v-card>
            </v-col>

            <!--Price Income-->
            <v-col cols="4">
                <v-card class="BoxShadow" color="deep-purple darken-1" dark>
                    <v-card-title class="pb-1 pt-6">
                        <span class="title font-weight-light">TIỀN LÃI</span>
                    </v-card-title>

                    <v-card-text class="font-weight-bold text-h4 pb-5">
                        {{$String.toPrice(PriceIncome)}}
                    </v-card-text>
                </v-card>
            </v-col>

            <!--Price Funds-->
            <v-col cols="4">
                <v-card class="BoxShadow" color="indigo" dark>
                    <v-card-title class="pb-1 pt-6">
                        <span class="title font-weight-light">TỔNG VỐN</span>
                    </v-card-title>

                    <v-card-text class="font-weight-bold text-h4 pb-5">
                        {{$String.toPrice(PriceFunds)}}
                    </v-card-text>
                </v-card>
            </v-col>

            <!--Product In Sold-->
            <v-col cols="4">
                <v-card class="BoxShadow" color="info" dark>
                    <v-card-title class="pb-1 pt-6">
                        <span class="title font-weight-light">ĐÃ BÁN</span>
                    </v-card-title>

                    <v-card-text class="font-weight-bold text-h4 pb-5">
                        {{ ProductSold }}
                    </v-card-text>
                </v-card>
            </v-col>
            
            <!--Product Order Wait-->
            <v-col cols="4">
                <v-card class="BoxShadow" color="red darken-2" dark>
                    <v-card-title class="pb-1 pt-6">
                        <span class="title font-weight-light">ĐANG ORDER</span>
                    </v-card-title>

                    <v-card-text class="font-weight-bold text-h4 pb-5">
                        {{ ProductOrderWait }}
                    </v-card-text>
                </v-card>
            </v-col>

            <!--Product In Stock-->
            <v-col cols="4">
                <v-card class="BoxShadow" color="blue-grey darken-2" dark>
                    <v-card-title class="pb-1 pt-6">
                        <span class="title font-weight-light">TỒN KHO</span>
                    </v-card-title>

                    <v-card-text class="font-weight-bold text-h4 pb-5">
                        {{ ProductInStock }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    computed: {
        //Price
        PriceRevenue () {
            let price = 0;

            this.productsOrder.forEach(productOrder => {
                price = price + productOrder.statistical.price.revenue;
            });

            return price;
        },
        PriceIncome () {
            let price = 0;

            this.productsOrder.forEach(productOrder => {
                price = price + productOrder.statistical.price.income;
            });

            return price;
        },
        PriceFunds () {
            let price = 0;

            this.warehouses.forEach(warehouse => {
                price = price + warehouse.statistical.price.funds;
            });

            return price;
        },
        //Product
        ProductInStock () {
            let number = 0;

            this.warehouses.forEach(warehouse => {
                number = number + warehouse.statistical.product.stock;
            });

            return number;
        },
        ProductOrderWait () {
            let number = 0;

            this.warehouseColors.forEach(warehouseColor => {
                number = number + warehouseColor.orderWait.amount;
            });

            return number;
        },
        ProductSold () {
            let number = 0;

            this.warehouses.forEach(warehouse => {
                number = number + warehouse.statistical.product.sold;
            });

            return number;
        },
    },

    async fetch (){
        try {
            let Get = await this.$axios.$get(this.$api.laptop.admin.GetGeneralStatistical);
            
                this.warehouses = Get.warehouses;
                this.warehouseColors = Get.warehouseColors;
                this.productsOrder = Get.productsOrder;
        }
        catch(e){
            throw new Error(e.toString());
        }
    },

    fetchOnServer: false
}
</script>