<template>
    <!--Laptop Product Create-->

    <v-card tile flat class="BoxShadow">
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary_admin--text">Create</v-card-title>
        <v-card-subtitle>Thêm 1 sản phẩm mới</v-card-subtitle>

        <!--Body-->
        <v-stepper
            v-model="Step"
            vertical
            class="elevation-0 rounded-0"
        >
            <!--Step 1-->
            <v-stepper-step
                :complete="Step > 1"
                step="1" color="primary_admin"
            >
                Thông Tin Cơ Bản
            </v-stepper-step>

            <v-stepper-content step="1">
                <ALaptopProductCreateStep1 @next="Save_Step_1"></ALaptopProductCreateStep1>
            </v-stepper-content>

            <!--Step 2-->
            <v-stepper-step
                :complete="Step > 2"
                step="2" color="primary_admin"
            >
                Cấu Hình Mặc Định
            </v-stepper-step>

            <v-stepper-content step="2">
                <ALaptopProductCreateStep2 @next="Save_Step_2" @back="Step = 1"></ALaptopProductCreateStep2>
            </v-stepper-content>

            <!--Step 3-->
            <v-stepper-step
                :complete="Step > 3"
                step="3" color="primary_admin"
            >
                Khả Năng Nâng Cấp
            </v-stepper-step>

            <v-stepper-content step="3">
                <ALaptopProductCreateStep3 @next="Save_Step_3" @back="Step = 2"></ALaptopProductCreateStep3>
            </v-stepper-content>

            <!--Step 4-->
            <v-stepper-step
                :complete="Step > 4"
                step="4" color="primary_admin"
            >
                Xác Nhận
            </v-stepper-step>

            <v-stepper-content step="4">
                <v-sheet class="d-flex justify-center">
                    <v-btn 
                        tile elevation="0" 
                        large
                        :disabled="Loading.create"
                        @click="Step = 1"
                    >
                        Xem Lại
                    </v-btn>

                    <v-btn 
                        color="primary_admin" 
                        tile elevation="0" 
                        large dark 
                        :loading="Loading.create"
                        @click="CreateNewProduct"
                    >
                        Thêm Sản Phẩm
                    </v-btn>
                </v-sheet>
            </v-stepper-content>
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
            }
        }
    },

    methods: {
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
        async CreateNewProduct(){
            this.Loading.create = true;

            try {
                let NewProduct = await this.$axios.$post(LaptopAPI.admin.CreateNewProduct, {
                    product: this.NewProduct,
                    configuration: this.NewConfiguration
                });

                this.Loading.create = false;
                this.$router.push(`/admin/laptop/product/${NewProduct.link}/information`);
            }
            catch(e){
                return false;
            } 
        }
    }
}
</script>