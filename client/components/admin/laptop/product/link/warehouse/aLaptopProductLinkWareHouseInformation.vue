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
                                    <th width="130" class="text-center">Đang Order</th>
                                    <th width="120" class="text-center">Đã Bán</th>
                                    <th width="100" class="text-right">Tồn Kho</th>
                                </tr>
                            </thead>

                            <!--Table Body-->
                            <tbody>
                                <tr v-for="(warehouseColor, indexColor) in CloneWareHouse.colors" :key="indexColor" class="font-weight-bold">
                                    <!--Color-->
                                    <td class="py-2">
                                        <v-btn fab elevation="0" width="35" height="35" :color="FindColorByID(warehouseColor.information)"></v-btn>
                                    </td>
                                    
                                    <!--Discount-->
                                    <td class="text-center">
                                        <v-chip v-if="warehouseColor.export.upprice < 1">Không</v-chip>
                                        <v-chip v-else color="info" dark>{{ $String.toPrice(warehouseColor.export.upprice) }}đ</v-chip>
                                    </td>

                                    <!--Order Wait-->
                                    <td class="text-center">
                                        <v-chip>{{warehouseColor.orderWait.amount}}</v-chip>
                                    </td>

                                    <!--Sold-->
                                    <td class="text-center">
                                        <v-chip>{{warehouseColor.export.amount}}</v-chip>
                                    </td>

                                    <!--Warehouse Amount-->
                                    <td class="text-right">
                                        <v-chip>{{warehouseColor.import.amount}}</v-chip>
                                    </td>
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
                    <!--Visibility-->
                    <v-sheet class="d-flex justify-space-between mb-6 pl-2">
                        <span class="text-subtitle-1 font-weight-bold">Ẩn/Hiện kho hàng</span>

                        <v-switch 
                            v-model="CloneWareHouse.visibility" 
                            hide-details color="primary" 
                            class="ma-0 pa-0"
                            style="margin-right: -10px !important"
                            inset
                            @change="EditVisibilityWareHouse"
                            :disabled="Loading.editVisibility"
                        ></v-switch>
                    </v-sheet>

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
                    <div class="d-flex">
                        <v-btn 
                            color="error" dark
                            rounded elevation="0" large 
                            @click="DeleteWarehouse"
                            :disabled="Loading.edit"
                            :loading="Loading.delete"
                        >
                            Xóa Kho
                        </v-btn>

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
                            :disabled="Loading.delete"
                            :loading="Loading.edit"
                            @click="EditExportPrice"
                        >
                            Luu
                        </v-btn>
                    </div>
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
                edit: false,
                delete: false,
                editVisibility: false
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

        async DeleteWarehouse () {
            if(!this.$refs.form.validate()) return false;

            this.Loading.delete = true;

            try {
                let Edit = await this.$axios.$post(this.$api.laptop.admin.DeleteWarehouse, {
                    _id: this.CloneWareHouse._id
                });

                this.Loading.delete = false;

                this.$emit('delete');

                this.Cancel();
            }
            catch (e) {
                this.Loading.delete = false;
            }
        },

        async EditVisibilityWareHouse () {
            this.Loading.editVisibility = true;

            try {
                let Visibility = await this.$axios.$post(this.$api.laptop.admin.EditVisibilityWareHouse, {
                    _id: this.CloneWareHouse._id
                });

                this.Loading.editVisibility = false;
                this.warehouse.visibility = Visibility;
            }
            catch (e) {
                this.Loading.editVisibility = false;
                this.CloneWareHouse.visibility = !this.CloneWareHouse.visibility;
            }
        },

        Cancel () {
            this.Tab = 0;
            this.$emit('cancel');
        }
    }
}
</script>