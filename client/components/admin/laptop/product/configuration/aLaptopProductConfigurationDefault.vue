<template>
    <!--a_laptop_product_configuration_default-->

    <v-card tile flat class="mt-4">
        <!--Header-->
        <v-card-title class="font-weight-bold primary_admin--text text-h4">Default</v-card-title>
        <v-card-subtitle>Cấu hình cơ bản của sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-row class="px-4">
            <!--Col - 1-->
            <v-col cols="6">
                <div v-for="item in Input_1" :key="item.label">
                    <v-combobox v-if="item.select"
                        v-model="ConfigurationDefault[item.model]"
                        :label="item.label"
                        outlined :items="ConfigurationSelect[item.model]"
                        :placeholder="item.placeholder"
                        color="primary_admin"
                        item-color="primary_admin"
                        :multiple="item.multiple"
                        autocomplete="off"
                        :disabled="Loading.edit"
                    ></v-combobox>

                    <v-text-field v-else
                        v-model="ConfigurationDefault[item.model]"
                        :label="item.label"
                        outlined
                        :placeholder="item.placeholder"
                        color="primary_admin"
                        autocomplete="off"
                        :disabled="Loading.edit"
                    ></v-text-field>
                </div>
            </v-col>

            <!--Col - 2-->
            <v-col cols="6">
                <div v-for="item in Input_2" :key="item.label">
                    <v-combobox v-if="item.select"
                        v-model="ConfigurationDefault[item.model]"
                        :label="item.label"
                        outlined :items="ConfigurationSelect[item.model]"
                        :placeholder="item.placeholder"
                        color="primary_admin"
                        item-color="primary_admin"
                        :multiple="item.multiple"
                        autocomplete="off"
                        :disabled="Loading.edit"
                    ></v-combobox>

                    <v-text-field v-else
                        v-model="ConfigurationDefault[item.model]"
                        :label="item.label"
                        outlined
                        :placeholder="item.placeholder"
                        color="primary_admin"
                        autocomplete="off"
                        :disabled="Loading.edit"
                    ></v-text-field>
                </div>
            </v-col>
        </v-row>
        
        <!--Footer-->
        <v-card-actions class="pa-4 pt-0">
            <v-spacer></v-spacer>

            <v-btn 
                color="primary_admin" dark 
                elevation="0" tile large
                :loading="Loading.edit"
                @click="EditDefault"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';
import ConfigurationSelect from '@/setting/laptop/configuration';

export default {
    props: ['product'],

    data () {
        return {
            ID: this.product.configuration._id,
            ConfigurationDefault: this.product.configuration.default,
            ConfigurationSelect: ConfigurationSelect,
            Input_1: [
                {label: 'Màn Hình', placeholder: 'Thông tin màn hình', model: 'screen', select: true, multiple: true},
                {label: 'CPU', placeholder: 'Thế hệ CPU', model: 'cpu', select: true},
                {label: 'RAM', placeholder: 'Loại RAM', model: 'ram', select: true}, 
                {label: 'Ổ Đĩa', placeholder: 'Các loại ổ đĩa', model: 'harddrive', select: true, multiple: true}, 
                {label: 'Webcam', placeholder: 'Cấu hình Webcam', model: 'webcam', select: true},
                {label: 'Audio', placeholder: 'Cấu hình Audio', model: 'audio'},
                {label: 'Wifi', placeholder: 'Cấu hình Wifi', model: 'wifi', select: true},
                {label: 'Kết Nối', placeholder: 'Các cổng kết nối', model: 'connect'},
                {label: 'Bluetooth', placeholder: 'Cấu hình Bluetooth', model: 'bluetooth', select: true},
            ],
            Input_2: [
                {label: 'Led Phím', placeholder: 'Đèn Led bàn phím', model: 'ledkeyboard', select: true},
                {label: 'Pin', placeholder: 'Dung lượng Pin', model: 'pin'},
                {label: 'Kích Thước', placeholder: 'ex. 100mm x 120mm x 20mm', model: 'size'},
                {label: 'Cân Nặng', placeholder: 'Cân nặng sản phẩm', model: 'weight'},
                {label: 'Bảo Mật', placeholder: 'Các bảo mật tích hợp', model: 'security'},
                {label: 'Hệ Điều Hành', placeholder: 'Chi tiết hệ điều hành', model: 'windows', select: true},
                {label: 'Xuất Xứ', placeholder: 'Xuất xử sản phẩm', model: 'origin', select: true},
                {label: 'Phân Phối', placeholder: 'Loại sản phẩm', model: 'typeproduct', select: true},
                {label: 'Bảo Hành', placeholder: 'Thông tin bảo hành', model: 'guarantee', select: true},
            ],
            Loading: {
                edit: false
            }
        }
    },

    methods : {
        async EditDefault () {
            this.Loading.edit = true;

            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditDefaultConfiguration, {
                    _id: this.ID,
                    default: this.ConfigurationDefault
                });

                this.Loading.edit = false;
            }
            catch(e){
                return false;
            }   
        }
    }
}
</script>