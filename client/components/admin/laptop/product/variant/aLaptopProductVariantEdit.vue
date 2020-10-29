<template>
    <!--a_laptop_product_variant_edit-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary_admin--text">Edit Variant</v-card-title>
        <v-card-subtitle>Cài đặtđặt biến thể sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0">
            <v-form ref="form" v-model="Validate.form">
                <v-row>
                    <!--Inputs-1-->
                    <v-col :cols="6">
                        <div v-for="(item, index) in Input_1" :key="index">
                            <!--If (item.combobox = true) -->
                            <v-combobox
                                v-if="item.combobox"
                                :items="VariantSelectConfiguration[item.name]"
                                v-model="CloneVariant[item.name]"
                                :rules="Validate[item.name]"
                                :label="item.label"                    
                                :placeholder="item.placeholder"
                                :type="item.type ? item.type : 'text'"
                                color="primary_admin"
                                item-color="primary_admin"
                                autocomplete="off"
                                outlined
                                :disabled="Loading.edit"
                            ></v-combobox>

                            <!--Else-->
                            <v-text-field
                                v-else
                                v-model="CloneVariant[item.name]"
                                :rules="Validate[item.name]"
                                :label="item.label"                    
                                :placeholder="item.placeholder"
                                :type="item.type ? item.type : 'text'"
                                color="primary_admin"
                                autocomplete="off"
                                outlined
                                :disabled="Loading.edit"
                            ></v-text-field>     
                        </div>  
                    </v-col>

                    <!--Inputs-2-->
                    <v-col :cols="6">
                        <div v-for="(item, index) in Input_2" :key="index">
                            <!--If (item.combobox = true) -->
                            <v-combobox
                                v-if="item.combobox"
                                :items="VariantSelectConfiguration[item.name]"
                                v-model="CloneVariant[item.name]"
                                :rules="Validate[item.name]"
                                :label="item.label"                    
                                :placeholder="item.placeholder"
                                :type="item.type ? item.type : 'text'"
                                color="primary_admin"
                                item-color="primary_admin"
                                autocomplete="off"
                                outlined
                                :disabled="Loading.edit"
                            ></v-combobox>

                            <!--If (item.select = true) -->
                            <v-select
                                v-else-if="item.select"
                                v-model="CloneVariant[item.name]"
                                :rules="Validate[item.name]"
                                :label="item.label"                    
                                :placeholder="item.placeholder"
                                :items="VariantSelectConfiguration[item.name]"
                                color="primary_admin"
                                item-color="primary_admin"
                                autocomplete="off"
                                outlined
                                :disabled="Loading.edit"
                            ></v-select>

                            <!--Else-->
                            <v-text-field
                                v-else
                                v-model="CloneVariant[item.name]"
                                :rules="Validate[item.name]"
                                :label="item.label"                    
                                :placeholder="item.placeholder"
                                :type="item.type ? item.type : 'text'"
                                color="primary_admin"
                                autocomplete="off"
                                outlined
                                :disabled="Loading.edit"
                            ></v-text-field>     
                        </div>  
                    </v-col>
                </v-row>     
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4">
            <v-btn 
                color="error" dark 
                tile elevation="0" 
                large class="mx-0"
                :disabled="Loading.edit"
                :loading="Loading.delete" 
                @click="DeleteVariant"
            >
                Xóa
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn 
                tile elevation="0" large 
                :disabled="Loading.delete || Loading.edit"  
                @click="Cancel"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="primary_admin" dark 
                tile elevation="0" 
                large class="mx-0" 
                :disabled="Loading.delete"
                :loading="Loading.edit" 
                @click="EditVariant"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';
import * as VariantSetting from '@/setting/laptop/variant';

export default {
    props: ['variant'],

    data () {
        return {
            VariantSelectConfiguration: VariantSetting.configuration,
            CloneVariant: JSON.parse(JSON.stringify(this.variant)),
            Loading: {
                edit: false,
                delete: false
            },
            Validate: {
                form: true,
                code: [
                    v => !!v || 'Must not be left blank',
                ],
                screen: [
                    v => !!v || 'Must not be left blank',
                ],
                cpu: [
                    v => !!v || 'Must not be left blank',
                ],
                ram: [
                    v => !!v || 'Must not be left blank',
                ],
                gpu: [
                    v => !!v || 'Must not be left blank',
                ],
                harddrive: [
                    v => !!v || 'Must not be left blank',
                ],
                price: [
                    v => !!v || 'Must not be left blank',
                ],
                status: [
                    v => !!v || 'Must not be left blank',
                ],
            },
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

    watch: {
        variant (newVal) {
            this.CloneVariant = JSON.parse(JSON.stringify(this.variant))
        }
    },

    methods : {
        async EditVariant () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.edit = true;
    
            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditVariant, this.CloneVariant);

                this.Loading.edit = false;
                Object.assign(this.variant, this.CloneVariant);

                this.Cancel();
            }
            catch(e){
                return false;
            } 
        },

        async DeleteVariant () {
            this.Loading.delete = true;
            
            try {
                let Delete = await this.$axios.$post(LaptopAPI.admin.DeleteVariant, this.CloneVariant);

                this.Loading.delete = false;
                this.$emit('delete');

                this.Cancel();
            }
            catch(e){
                return false;
            } 
        },

        Cancel () {
            this.$refs.form.resetValidation();

            this.$emit('cancel');
        },
    }
}
</script>