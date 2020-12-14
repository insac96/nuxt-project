<template>
    <!--Laptop Product Link WareHouse-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 info--text">WareHouse Information</v-card-title>
        <v-card-subtitle>Quản lý kho sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-tabs background-color="info" dark v-model="Tab" class="rounded-0">
            <v-tab>Thông Tin</v-tab>
            <v-tab>Cài Đặt</v-tab>

            <v-tabs-items v-model="Tab" class="pa-6">
                <!-- Information -->
                <v-tab-item>
                    <v-sheet class="d-flex justify-space-between align-center my-2">
                        <span class="font-weight-bold text-uppercase">Ngày Nhập</span>
                        <v-chip color="info" outlined class="font-weight-bold">{{$dayjs(CloneWareHouse.import.date).format('DD/MM/YYYY')}}</v-chip>
                    </v-sheet>

                    <v-sheet class="d-flex justify-space-between align-center my-2">
                        <span class="font-weight-bold text-uppercase">Giá Nhập</span>
                        <v-chip color="info" outlined class="font-weight-bold">{{$String.toPrice(CloneWareHouse.import.price)}}</v-chip>
                    </v-sheet>

                    <v-sheet class="d-flex justify-space-between align-center my-2 mb-4">
                        <span class="font-weight-bold text-uppercase">Giá Bán</span>
                        <v-chip color="info" outlined class="font-weight-bold">{{$String.toPrice(CloneWareHouse.export.price)}}</v-chip>
                    </v-sheet>

                    <!-- Color -->
                    <v-simple-table class="Table">
                        <template v-slot:default>
                            <!--Table Header-->
                            <thead>
                                <tr>
                                    <th width="50">Màu</th>
                                    <th class="text-center">Tăng Giá</th>
                                    <th width="120" class="text-center">Đã Bán</th>
                                    <th width="120" class="text-right">Tồn Kho</th>
                                </tr>
                            </thead>

                            <!--Table Body-->
                            <tbody>
                                <tr v-for="(warehouseColor, indexColor) in CloneWareHouse.colors" :key="indexColor" class="font-weight-bold">
                                    <td class="py-2">
                                        <v-btn fab elevation="0"  width="40" height="40" :color="FindColorByID(warehouseColor.information)"></v-btn>
                                    </td>

                                    <td class="text-center">{{$String.toPrice(warehouseColor.export.upprice)}}</td>
                                    <td class="text-center">0</td>
                                    <td class="text-right">{{warehouseColor.import.amount}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>

                    <!-- Button Action -->
                    <v-sheet class="d-flex pt-4">
                        <v-spacer></v-spacer>
                        <v-btn 
                            rounded elevation="0" large 
                            @click="Cancel" :disabled="Loading.edit"
                        >
                            Đóng
                        </v-btn>
                    </v-sheet>
                </v-tab-item>

                <!-- Setting -->
                <v-tab-item>
                    <v-form ref="form" v-model="Validate">
                        <!--Export-->
                        <v-text-field
                            v-model.number="CloneWareHouse.export.price"
                            :rules="[ $Rules.required, $Rules.price ]"
                            label="Export Price"                    
                            placeholder="Giá bán sản phẩm"
                            color="create"
                            type="number"
                            autocomplete="off"
                            filled rounded
                            :disabled="Loading.edit"
                        ></v-text-field>
                    </v-form>

                    <!-- Button Action -->
                    <v-sheet class="d-flex">
                        <v-spacer></v-spacer>
                        
                        <v-btn 
                            rounded elevation="0" large 
                            @click="Cancel" :disabled="Loading.edit"
                        >
                            Đóng
                        </v-btn>

                        <v-btn 
                            color="info" dark
                            rounded elevation="0" large 
                            @click="EditExportPrice"
                            :loading="Loading.edit"
                        >
                            Luu
                        </v-btn>
                    </v-sheet>
                </v-tab-item>
            </v-tabs-items>
        </v-tabs>
    </v-card>
</template>

<script>
export default {
    props: ['variant' , 'warehouse'],
    data () {
        return {
            Tab: 0,
            CloneWareHouse : JSON.parse(JSON.stringify(this.warehouse)),
            Validate: true,
            Loading: {
                edit: false 
            }
        }
    },

    watch: {
        warehouse (newVal) {
            this.CloneWareHouse = JSON.parse(JSON.stringify(newVal))
        }
    },

    methods: {
        FindColorByID (id) {
            let color = this.variant.colors.find(e => e._id == id);

            return color.code;
        },

        async EditExportPrice () {
            if(!this.$refs.form.validate()) return false;

            this.Loading.edit = true;

            try {
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditWarehouseExportPrice, {
                    _id: this.CloneWareHouse._id,
                    export: this.CloneWareHouse.export
                });

                Object.assign(this.warehouse.export, this.CloneWareHouse.export);

                this.Loading.edit = false;
            }
            catch (e) {
                this.Loading.edit = false;
            }
        },

        Cancel () {
            this.$emit('cancel');
        }
    }
}
</script>