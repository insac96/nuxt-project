<template>
    <!--a_laptop_product_create_step_2-->

    <v-form class="my-4" ref="form">
        <v-row>
            <!--Col 1-->
            <v-col cols="6">
                <div v-for="item in Input_1" :key="item.label">
                    <v-combobox v-if="item.select"
                        v-model="Default[item.model]"
                        :label="item.label"
                        outlined :items="ConfigurationSelect[item.model]"
                        :placeholder="item.placeholder"
                        color="create"
                        item-color="create"
                        :multiple="item.multiple"
                        autocomplete="off"
                    ></v-combobox>

                    <v-text-field v-else
                        v-model="Default[item.model]"
                        :label="item.label"
                        outlined
                        :placeholder="item.placeholder"
                        color="create"
                        autocomplete="off"
                    ></v-text-field>
                </div>
            </v-col>

            <!--Col 2-->
            <v-col cols="6">
                <div v-for="item in Input_2" :key="item.label">
                    <v-combobox v-if="item.select"
                        v-model="Default[item.model]"
                        :label="item.label"
                        outlined :items="ConfigurationSelect[item.model]"
                        :placeholder="item.placeholder"
                        color="create"
                        item-color="create"
                        :multiple="item.multiple"
                        autocomplete="off"
                    ></v-combobox>

                    <v-text-field v-else
                        v-model="Default[item.model]"
                        :label="item.label"
                        outlined
                        :placeholder="item.placeholder"
                        color="create"
                        autocomplete="off"
                    ></v-text-field>
                </div>
            </v-col>
        </v-row>
        
        <!--Button-->
        <v-sheet class="d-flex justify-end">
            <v-btn tile elevation="0" large @click="$emit('back')">
                Back
            </v-btn>
            
            <v-btn color="create" tile elevation="0" large dark @click="NextStep()">
                Next
            </v-btn>
        </v-sheet>
    </v-form>
</template>

<script>
import ConfigurationSelect from '@/setting/laptop/configuration';

export default {
    props: ['NewLaptop'],
    data () {
        return {
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
            Default: {
                screen: null,
                cpu: null,
                ram: null,
                harddrive: null,
                ledkeyboard: null,
                webcam: '720P',
                audio: null,
                wifi: null,
                windows: 'Windows 10 Bản Quyền',
                weight: null,
                size: null,
                pin: null,
                security: null,
                connect: null,
                bluetooth: null,
                origin: null,
                typeproduct: null,
                guarantee: '12 Tháng'
            }
        }
    },
    methods: {
        async NextStep () {
            this.$emit('next', this.Default);
        }
    }
}
</script>