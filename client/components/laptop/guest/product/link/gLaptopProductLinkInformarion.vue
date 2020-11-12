<template>
    <!--g_laptop_product_link_informarion-->

    <v-card flat tile>
        <!--Header-->
        <v-card-title class="text-h4 text-sm-h3 font-weight-bold" style="word-break: break-word;">{{Product.name}}</v-card-title>
        <v-card-subtitle v-if="Select.variant" class="text-subtitle-2 text-sm-subtitle-1 text-md-h6">CODE: {{Select.variant.code}}</v-card-subtitle>
        
        <!-- Information -->
        <div class="px-4 mb-4 d-flex justify-space-between align-center">
            <v-card outlined>
                <v-img :src="Company.logo" :alt="Company.name" width="90"></v-img>
            </v-card>
            <div class="text-center">
                <v-rating
                    v-model="Ranting"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    empty-icon="$ratingFull"
                    half-increments
                    hover small
                ></v-rating>
                <span class="text-sm-h6">(30 đánh giá)</span>
            </div>
        </div>

        <!-- If Variant List Empty -->
        <v-card-text class="py-0" v-if="Variants.length == 0">
            <v-alert type="info" text border="left" color="primary">
                Hiện không có cấu hình để lựa chọn
            </v-alert>
        </v-card-text>

        <!-- ELSE -->
        <v-sheet v-else>
            <!-- Number Variant -->
            <div class="px-4">
                <v-divider class="my-4"></v-divider>

                <v-alert type="info" dense text border="left" color="primary">
                    Hiện có {{Variants.length}} cấu hình cho bạn lựa chọn
                </v-alert>

                <v-divider class="my-4"></v-divider>
            </div>

            <!-- Configuration -->
            <div class="px-4 mb-4">
                <!-- Head -->
                <div class="d-flex justify-space-between align-center mb-3" style="height: 32px;">
                    <span class="text-subtitle-1 text-sm-h6 font-weight-bold">1. CẤU HÌNH</span>

                    <v-chip
                        v-if="Select.variant['discount'].type"
                        color="error"
                        class="font-weight-bold"
                    >
                        - {{ $String.toPrice(Select.variant['discount'].amount) }}
                    </v-chip>
                </div>

                <!-- Select Button -->
                <v-chip-group
                    mandatory
                    v-for="type in ListType" :key="type" 
                    v-model="Select.variant[type]"
                >
                    <v-chip
                        v-for="name in GetListByType(type)" :key="name"
                        :value="name" label
                        active-class="active-select active-select--chip"
                        @click="SelectVariant(name, type)"
                    >
                        {{name}}
                    </v-chip>
                </v-chip-group>
            </div>

            <!-- Color -->
            <div class="px-4 mb-6" v-if="Select.color">
                <v-divider class="my-4"></v-divider>

                <!-- Head -->
                <div class="d-flex justify-space-between align-center mb-3" style="height: 32px;">
                    <span class="text-subtitle-1 text-sm-h6 font-weight-bold">2. MÀU SẮC</span>

                    <v-chip 
                        v-if="Select.color.export.upprice > 0"
                        color="info"
                        class="font-weight-bold"
                    >
                        + {{ $String.toPrice(Select.color.export.upprice) }}
                    </v-chip>
                </div>

                <!-- Select Button -->
                <v-btn-toggle>
                    <v-btn 
                        v-for="(warehouseColor, indexColor) in Select.variant.warehouse.colors" :key="indexColor"    
                        :color="warehouseColor.information.code" fab :ripple="false" active-class="active-select"
                        @click="SelectColor(warehouseColor)"
                    >
                        <v-icon v-if="Select.color._id == warehouseColor._id" color="white">check</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </div>

            <!--Add to Cart-->
            <div class="px-4 pb-4" v-if="Select.variant && Select.color">
                <v-divider class="my-4"></v-divider>

                <!-- Head -->
                <div class="text-subtitle-1 text-sm-h6 font-weight-bold mb-2">3. THÀNH TIỀN</div>

                <!--Total Price-->
                <div class="d-flex justify-space-between align-center mb-2">
                    Cấu Hình

                    <span>{{ $String.toPrice(Select.variant['warehouse'].export.price) }}</span>
                </div>

                <!--Total Color UpPrice-->
                <div class="d-flex justify-space-between align-center mb-2">
                    Màu Sắc
                    <span>+ {{ $String.toPrice(Select.color['export'].upprice) }}</span>
                </div>

                <!--Total Discount-->
                <div class="d-flex justify-space-between align-center mb-2">
                    Giảm Giá
                    <span v-if="Select.variant['discount'].type">- {{ $String.toPrice(Select.variant['discount'].amount) }}</span>
                    <span v-else>- 0</span>
                </div>

                <!--Total-->
                <div class="d-flex justify-space-between align-center mb-6 font-weight-bold text-h6 text-sm-h5">
                    Total
                    <span class="error--text">{{TotalPrice}}</span>
                </div>

                <!-- Button Add Cart -->
                <v-btn block color="primary" dark x-large elevation="0" @click="AddToCart">
                    <v-icon class="mr-3">shopping_cart</v-icon> 
                    Thêm vào giỏ hàng
                </v-btn>
            </div>
        </v-sheet>
    </v-card>
</template>

<script>
export default {
    props: ['product', 'variantQuery'],

    data () {
        return {
            Product: this.product,
            Company: this.product.company,
            Trademark: this.product.trademark,
            Configuration: this.product.configuration,
            Variants: this.product.variants,
            VariantQuery: this.variantQuery,

            ////////////
            Ranting: 4,
            Select: {
                variant: null,
                color: null
            },
            ListType: ['screen', 'cpu', 'ram', 'harddrive', 'gpu'],
        }
    },

    created(){
        this.SetVariantStart();
    },

    computed: {
        TotalPrice () {
            let Price = this.Select.variant['warehouse'].export.price;
            let ColorUpPrice = this.Select.color['export'].upprice;
            let Discount = this.Select.variant['discount'];

            if(Discount.type) return this.$String.toPrice(Price + ColorUpPrice - Discount.amount);

            return this.$String.toPrice(Price + ColorUpPrice);
        }
    },

    methods: {
        SetVariantStart () {
            if(this.Variants.length < 1) return false;

            if(this.VariantQuery){
                this.Select.variant = this.VariantQuery;

                let Warehouse = this.VariantQuery.warehouse;
                if(!Warehouse) return this.Select.color == null;

                this.Select.color = Warehouse.colors.length > 0 ? Warehouse.colors[0] : null;
            }
            else {
                this.Select.variant = this.Variants[0];

                let Warehouse = this.Variants[0].warehouse;
                if(!Warehouse) return this.Select.color == null;

                this.Select.color = Warehouse.colors.length > 0 ? Warehouse.colors[0] : null;
            }
        },

        GetListByType (type) {
            let List = [];

            this.Variants.forEach(item => {
                if(List.indexOf(item[type]) >= 0) return false;
                List.push(item[type]);
            });

            return List;
        },

        SelectVariant (name, type) {
            let Check;
            let VariantQuery = [];

            this.Variants.forEach(item => {
                if(item[type] == name) return VariantQuery.push(item);
            });

            if(VariantQuery.length == 0) return this.SetNewSelectVariant(VariantQuery[0]);

            for (let i = 0; i < VariantQuery.length; i++) {
                let variant = VariantQuery[i];
                
                if(variant[type] == name){
                    for(let prop in this.Select.variant){ 
                        if(this.Select.variant[prop] == variant[prop]) {
                            Check = true;
                            return this.SetNewSelectVariant(VariantQuery[i]);
                        }
                    };
                }
            }

            if(!Check) return this.SetNewSelectVariant(VariantQuery[0]);
        },

        SetNewSelectVariant (variant) {
            this.Select.variant = variant;
            
            if(!variant.warehouse) return this.Select.color = null;

            this.Select.color = variant.warehouse.colors.length > 0 ? variant.warehouse.colors[0] : null;
        },

        SelectColor (color) {
            this.Select.color = color;
        },

        //Cart
        AddToCart () {
            let item = {
                color: this.Select.color._id
            };

            this.$store.commit('laptop/addToCart', item);
        }
    },
}
</script>

<style lang="scss">
    .active-select {
        &--chip {
            font-weight: bold !important;
            background: var(--v-primary-base) !important;
            color: #ffffff !important;
        }

        &::before {
            opacity: 0 !important;
        }
    }
</style>