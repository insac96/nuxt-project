<template>
    <!--a_laptop_product_variant_create-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary_admin--text">Create Variant</v-card-title>
        <v-card-subtitle>Tạo biến thể mới cho sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0">
            <v-form ref="form" v-model="Validate">
                <v-row>
                    <!--Inputs-1-->
                    <v-col :cols="6">
                        <div v-for="(item, index) in Input_1" :key="index">
                            <!--If (item.combobox = true) -->
                            <v-combobox
                                v-if="item.combobox"
                                v-model="NewVariant[item.name]"
                                :rules="[ $Rules.required ]"
                                :label="item.label"                    
                                :placeholder="item.placeholder"
                                :type="item.type ? item.type : 'text'"
                                :items="VariantSelectConfiguration[item.name]"
                                color="primary_admin"
                                item-color="primary_admin"
                                autocomplete="off"
                                outlined
                                :disabled="Loading.create"
                            ></v-combobox>

                            <!--Else-->
                            <v-text-field
                                v-else
                                v-model="NewVariant[item.name]"
                                :rules="[ $Rules.required ]"
                                :label="item.label"                    
                                :placeholder="item.placeholder"
                                :type="item.type ? item.type : 'text'"
                                color="primary_admin"
                                autocomplete="off"
                                outlined
                                :disabled="Loading.create"
                            ></v-text-field>     
                        </div>  
                    </v-col>

                    <!--Inputs-2-->
                    <v-col :cols="6">
                        <div v-for="(item, index) in Input_2" :key="index">
                            <!--If (item.combobox = true) -->
                            <v-combobox
                                v-if="item.combobox"
                                v-model="NewVariant[item.name]"
                                :rules="[ $Rules.required ]"
                                :label="item.label"                    
                                :placeholder="item.placeholder"
                                :type="item.type ? item.type : 'text'"
                                :items="VariantSelectConfiguration[item.name]"
                                color="primary_admin"
                                item-color="primary_admin"
                                autocomplete="off"
                                outlined
                                :disabled="Loading.create"
                            ></v-combobox>

                            <!--If (item.select = true) -->
                            <v-select
                                v-else-if="item.select"
                                v-model="NewVariant[item.name]"
                                :rules="[ $Rules.required ]"
                                :label="item.label"                    
                                :placeholder="item.placeholder"
                                :items="VariantSelectConfiguration[item.name]"
                                color="primary_admin"
                                item-color="primary_admin"
                                autocomplete="off"
                                outlined
                                :disabled="Loading.create"
                            ></v-select>

                            <!--Else-->
                            <v-text-field
                                v-else
                                v-model="NewVariant[item.name]"
                                :rules="[ (item.name == 'price' ? $Rules.price : $Rules.required) ]"
                                :label="item.label"                    
                                :placeholder="item.placeholder"
                                :type="item.type ? item.type : 'text'"
                                color="primary_admin"
                                autocomplete="off"
                                outlined
                                :disabled="Loading.create"
                            ></v-text-field>     
                        </div>  
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-spacer></v-spacer>
            <v-btn 
                tile elevation="0" large 
                :disabled="Loading.create" 
                @click="Cancel"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="primary_admin" dark 
                tile elevation="0" 
                large class="mx-0" 
                :loading="Loading.create" 
                @click="CreateVariant"
            >
                Thêm Mới
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';
import * as VariantSetting from '@/setting/laptop/variant';

export default {
    props: ['product'],

    data () {
        return {
            VariantSelectConfiguration: VariantSetting.configuration,
            Loading: {
                create: false
            },
            NewVariant: {
                company: null,
                trademark: null,
                product: null,
                code: null,
                screen: null,
                cpu: null,
                ram: null,
                gpu: null,
                harddrive: null,
                price: null,
                status: null
            },
            Validate: true,
            Input_1 : [
                {name: 'code', label: 'Code', placeholder: 'Mã số cấu hình'},
                {name: 'screen', label: 'Screen', placeholder: 'ex: 14" FHD', combobox: true},
                {name: 'cpu', label: 'CPU', placeholder: 'ex: i5 9900H', combobox: true},
                {name: 'ram', label: 'RAM', placeholder: 'ex: 8GB', combobox: true},
            ],
            Input_2 : [
                {name: 'harddrive', label: 'HardDrive', placeholder: 'ex: 512GB', combobox: true},
                {name: 'gpu', label: 'GPU', placeholder: 'ex: RTX 2060', combobox: true},
                {name: 'price', label: 'Price', placeholder: 'Giá bán của cấu hình', type: 'number'},
                {name: 'status', label: 'Status', placeholder: 'Trạng thái cấu hình', type: 'number', select: true},
            ]
        }
    },

    methods : {
        async CreateVariant () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.create = true;

            try {
                this.NewVariant.company = this.product.company._id;
                this.NewVariant.trademark = this.product.trademark._id;
                this.NewVariant.product = this.product._id;

                let NewVariant = await this.$axios.$post(LaptopAPI.admin.CreateNewVariant, this.NewVariant);

                this.Loading.create = false;
                this.Update(NewVariant);    
            }
            catch(e){
                this.Loading.create = false;
            }    
        },

        Update (NewVariant) {
            NewVariant.colors = [];
            this.product.variants.push(NewVariant);

            this.Cancel();
        },

        Cancel () {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();

            this.$emit('cancel');
        },
    }
}
</script>