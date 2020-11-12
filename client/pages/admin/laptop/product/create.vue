<template>
    <!--Laptop Product Create-->

    <v-card tile flat>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary--text">Create Product</v-card-title>
        <v-card-subtitle>Thêm 1 sản phẩm mới</v-card-subtitle>

        <!--Body-->
        <v-stepper
            v-model="Step"
            class="elevation-0 rounded-0 card"
        >
            <!--Header-->
            <v-stepper-header class="heading BoxShadow">
                <v-stepper-step
                    :complete="Step > 1"
                    step="1" color="primary"
                >
                    Thông Tin Cơ Bản
                </v-stepper-step>

                <v-stepper-step
                    :complete="Step > 2"
                    step="2" color="primary"
                >
                    Cấu Hình Mặc Định
                </v-stepper-step>

                <v-stepper-step
                    :complete="Step > 3"
                    step="3" color="primary"
                >
                    Khả Năng Nâng Cấp
                </v-stepper-step>

                <v-stepper-step
                    :complete="Step > 4"
                    step="4" color="primary"
                >
                    Xác Nhận
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <!--Step 1-->
                <v-stepper-content step="1">
                    <ALaptopProductCreateStep1 @next="Save_Step_1" :ErrorHintName="ErrorHint.productName"></ALaptopProductCreateStep1>
                </v-stepper-content>

                <!--Step 2-->
                <v-stepper-content step="2">
                    <ALaptopProductCreateStep2 @next="Save_Step_2" @back="Step = 1"></ALaptopProductCreateStep2>
                </v-stepper-content>

                <!--Step 3-->
                <v-stepper-content step="3">
                    <ALaptopProductCreateStep3 @next="Save_Step_3" @back="Step = 2"></ALaptopProductCreateStep3>
                </v-stepper-content>

                <!--Step 4-->
                <v-stepper-content step="4">
                    <v-sheet class="d-flex justify-center">
                        <v-btn large rounded elevation="0" :disabled="Loading.create" @click="Step = 1">
                            Xem Lại
                        </v-btn>

                        <v-btn color="primary" dark rounded elevation="0" large :loading="Loading.create" @click="CreateNewProduct">
                            Thêm Sản Phẩm
                        </v-btn>
                    </v-sheet>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    data () {
        return {
            Step: 1,
            NewProduct: null,
            NewConfiguration: {
                product: null,
                company: null,
                default: null,
                upgrade: null,
            },
            Loading: {
                create: false
            },
            ErrorHint: {
                productName: null
            }
        }
    },

    methods: {
        //Save Step
        Save_Step_1(data){
            this.NewProduct = data;

            this.Step = 2;
        },
        Save_Step_2(data){
            this.NewConfiguration.default = data;

            this.Step = 3;
        },
        Save_Step_3(data){
            this.NewConfiguration.upgrade = data;

            this.Step = 4;
        },

        //Create
        async CreateNewProduct(){
            this.Loading.create = true;

            try {
                let NewProduct = await this.$axios.$post(LaptopAPI.admin.CreateNewProduct, {
                    product: this.NewProduct,
                    configuration: this.NewConfiguration
                });

                if(NewProduct.error) throw NewProduct;

                this.Loading.create = false;
                this.$router.push(`/admin/laptop/product/${NewProduct.link}/information`);
            }
            catch(e){
                this.Loading.create = false;

                if(e.error && e.status == 'name') {
                    this.Step = 1;
                    return this.ErrorHint.productName = e.message;
                }
            } 
        }
    }
}
</script>