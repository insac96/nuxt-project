<template>
    <!--Laptop Product Link Variant-->

    <v-card tile flat>
        <!--Header-->
        <v-sheet class="d-flex justify-space-between align-center pr-4">
            <div>
                <v-card-title class="font-weight-bold text-h4 primary--text">Variant</v-card-title>
                <v-card-subtitle>Các biến thể cấu hình của sản phẩm</v-card-subtitle>
            </div>

            <v-btn 
                color="primary" 
                dark elevation="0" 
                rounded large
                @click="VariantDialog.create = true"
            >
                <v-icon>add</v-icon>
                Thêm Mới
            </v-btn>
        </v-sheet>

        <!--Body-->
        <v-sheet>
            <!--Table-->
            <v-simple-table class="Table">
                <template v-slot:default>
                    <!--Table Header-->
                    <thead>
                        <tr>
                            <th>Cấu Hình</th>
                            <th class="text-center">Màu Sắc</th>
                            <th class="text-center" width="120">Giảm Giá</th>
                            <th class="text-center" width="120">Trạng Thái</th>
                            <th class="text-center" width="120">Kho</th>
                            <th class="text-right" width="30">Edit</th>
                        </tr>
                    </thead>

                    <!--Table Body-->
                    <tbody>
                        <tr v-for="(variant, indexVariant) in Variants" :key="indexVariant">
                            <!--1 - Configuration-->
                            <td class="py-4">
                                <v-sheet 
                                    v-for="prop in ConfigurationShow" :key="prop" 
                                    class="d-flex justify-space-between align-center my-1"
                                >
                                    <span class="text-caption font-weight-bold text-uppercase">{{prop}}</span>
                                    <v-chip small>{{ variant[prop] }}</v-chip>
                                </v-sheet>
                            </td>

                            <!--2 - Color-->
                            <td class="text-center">
                                <v-btn 
                                    v-for="(color, indexColor) in variant.colors" :key="indexColor" 
                                    :color="color.code" fab elevation="0" small
                                    @click="ShowVariantDialogEditColor(indexColor, color, variant)"
                                ></v-btn>
                                <v-btn 
                                    color="create" outlined fab elevation="0" small
                                    @click="ShowVariantDialogCreateColor(variant)"
                                ><v-icon>add</v-icon></v-btn>
                            </td>

                            <!--4 - Discount-->
                            <td class="text-center">
                                <div v-if="!variant.discount.type" class="d-flex justify-center">
                                    <v-switch 
                                        hide-details inset
                                        v-model="variant.discount.type" :disabled="Loading.editDiscount"
                                        @change="EditVariantDiscount(variant)"
                                        color="primary" class="ma-0 pa-0"
                                    ></v-switch>
                                </div>
                                
                                <v-btn
                                    v-else
                                    color="error"
                                    rounded outlined
                                    elevation="0"
                                    @click="ShowVariantDialogEditDiscount(variant)"
                                    class="font-weight-bold text-subtitle-1"
                                >
                                    {{ $String.toPrice(variant.discount.amount) }}
                                </v-btn>
                            </td>

                            <!--5 - Status-->
                            <td class="text-center">
                                <v-menu offset-y left transition="slide-y-transition" min-width="170" max-width="300" nudge-bottom="5">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn 
                                            color="info" rounded elevation="0" outlined
                                            :loading="Loading.editStatus"
                                            v-bind="attrs" v-on="on"
                                        >
                                            {{ variant.status }}
                                        </v-btn>
                                    </template>

                                    <v-list subheader class="pb-0" v-if="variant.warehouses.length > 0">
                                        <v-list-item
                                            color="info"
                                            v-for="(status, indexStatus) in VariantSelectConfiguration.status" :key="indexStatus"
                                            @click="EditVariantStatus(status, variant)"
                                        >
                                            <v-list-item-title>{{ status }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>

                                    <v-sheet v-else>
                                        <v-alert type="warning" color="info" text class="mb-0" prominent>
                                            Cần cập nhật <strong>Kho Hàng</strong> để sử dụng tính năng này !!!
                                        </v-alert>
                                    </v-sheet>
                                </v-menu>
                            </td>

                            <!--6 - WareHouse-->
                            <td class="text-center">
                                <v-menu v-if="variant.colors.length < 1" offset-y left transition="slide-y-transition" max-width="300" nudge-bottom="5">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="create" rounded elevation="0" dark outlined
                                            v-bind="attrs" v-on="on"
                                        >Nhập Kho</v-btn>
                                    </template>

                                    <v-sheet>
                                        <v-alert type="warning" color="create" text class="mb-0" prominent>
                                            Cần cập nhật <strong>Màu Sắc</strong> trước khi nhập kho !!!
                                        </v-alert>
                                    </v-sheet>
                                </v-menu>

                                <div v-else>
                                    <div v-for="(warehouse, indexWarehouse) in variant.warehouses" :key="indexWarehouse">
                                        <v-btn color="create" rounded elevation="0" dark class="mb-1" @click="ShowVariantDialogWareHouseInformarion(warehouse, variant)">
                                            {{$dayjs(warehouse.import_date).format('DD/MM/YYYY')}}
                                        </v-btn>
                                    </div>

                                    <v-btn
                                        color="create" rounded elevation="0" dark outlined
                                        @click="ShowVariantDialogImportWareHouse(variant)"
                                    >Nhập Kho</v-btn>
                                </div>
                            </td>

                            <!--7 - Edit-->
                            <td class="text-right py-2">
                                <v-btn 
                                    color="grey" icon small
                                    @click="ShowVariantDialogEdit(indexVariant, variant)"
                                ><v-icon>edit</v-icon></v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <!--If List Variant Empty-->
            <v-alert v-if="Variants.length < 1" class="mb-0" tile>
                Không có biến thể nào hiển thị
            </v-alert>

            <!--Body Footer-->
            <v-sheet class="d-flex justify-space-between align-center py-2 px-4" color="heading">
                <!--Count-->
                <v-chip> 
                    <span>{{Variants.length}} / {{Variants.length}}</span>
                </v-chip>
            </v-sheet>
        </v-sheet>

        <!--List Dialog-->
        <div>
            <!--Dialog Create Variant-->
            <v-dialog v-model="VariantDialog.create" persistent max-width="550">
                <ALaptopProductLinkVariantCreate 
                    @cancel="VariantDialog.create = false" 
                    :product="product"
                ></ALaptopProductLinkVariantCreate>
            </v-dialog>

            <!--Dialog Edit Variant-->
            <v-dialog v-model="VariantDialog.edit.type" persistent max-width="550">
                <ALaptopProductLinkVariantEdit
                    @delete="$delete(product.variants, VariantDialog.edit.index)"
                    @cancel="VariantDialog.edit.type = false" 
                    :variant="VariantDialog.edit.select"
                ></ALaptopProductLinkVariantEdit>
            </v-dialog>

            <!--Dialog Create Color Variant-->
            <v-dialog v-model="VariantColorDialog.create.type" persistent max-width="550">
                <ALaptopProductLinkVariantColorCreate
                    @cancel="VariantColorDialog.create.type = false" 
                    :variant="VariantColorDialog.create.select"
                ></ALaptopProductLinkVariantColorCreate>
            </v-dialog>

            <!--Dialog Setting Color Variant-->
            <v-dialog v-model="VariantColorDialog.edit.type" persistent max-width="550">
                <ALaptopProductLinkVariantColorEdit
                    @delete="$delete(VariantColorDialog.edit.variant.colors, VariantColorDialog.edit.index)"
                    @cancel="VariantColorDialog.edit.type = false" 
                    :color="VariantColorDialog.edit.select"
                ></ALaptopProductLinkVariantColorEdit>
            </v-dialog>

            <!--Dialog Edit Discount-->
            <v-dialog v-model="VariantDiscountDialog.edit.type" persistent max-width="550">
                <ALaptopProductLinkVariantDiscountEdit
                    @cancel="VariantDiscountDialog.edit.type = false" 
                    :variant="VariantDiscountDialog.edit.select"
                ></ALaptopProductLinkVariantDiscountEdit>
            </v-dialog>

            <!--Dialog Import WareHouse-->
            <v-dialog v-model="VariantWareHouseDialog.setting.type" persistent max-width="600">
                <ALaptopProductLinkWareHouseImport
                    @cancel="VariantWareHouseDialog.setting.type = false" 
                    :variant="VariantWareHouseDialog.setting.select"
                ></ALaptopProductLinkWareHouseImport>
            </v-dialog>

            <!--Dialog WareHouse Information-->
            <v-dialog v-model="VariantWareHouseDialog.info.type" persistent max-width="600">
                <ALaptopProductLinkWareHouseInformation
                    @cancel="VariantWareHouseDialog.info.type = false" 
                    :variant="VariantWareHouseDialog.info.variant"
                    :warehouse="VariantWareHouseDialog.info.select"
                ></ALaptopProductLinkWareHouseInformation>
            </v-dialog>
        </div>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';
import * as VariantSelectSetting from '@/setting/laptop/variant';

export default {
    props: ['product'],

    data () {
        return {
            VariantSelectConfiguration: VariantSelectSetting.configuration,
            Variants: this.product.variants,
            VariantDialog: {
                create: false,
                edit: {
                    type: false,
                    select: null,
                    index: null
                }
            },
            VariantColorDialog: {
                create: {
                    type: false,
                    select: null
                },
                edit: {
                    type: false,
                    select: null,
                    index: null,
                    variant: null
                }
            },
            VariantDiscountDialog: {
                edit: {
                    type: false,
                    select: null,
                }
            },
            VariantWareHouseDialog: {
                setting: {
                    type: false,
                    select: null,
                },
                info: {
                    type: false,
                    select: null,
                    variant: null
                }
            },
            Loading: {
                editStatus: false,
                editDiscount: false
            },
            ConfigurationShow: [
                'screen', 'cpu', 'ram', 'harddrive', 'gpu'
            ]
        }
    },

    methods : {
        //Edit Variant
        ShowVariantDialogEdit (indexVariant, variant) {
            this.VariantDialog.edit.select = variant;
            this.VariantDialog.edit.index = indexVariant;
            this.VariantDialog.edit.type = true;
        },

        //Edit Variant
        ShowVariantDialogEditDiscount (variant) {
            this.VariantDiscountDialog.edit.select = variant;
            this.VariantDiscountDialog.edit.type = true;
        },

        //Create Color
        ShowVariantDialogCreateColor (variant) {
            this.VariantColorDialog.create.select = variant;
            this.VariantColorDialog.create.type = true;
        },

        //Setting Color
        ShowVariantDialogEditColor (indexColor, color, variant) {
            this.VariantColorDialog.edit.index = indexColor;
            this.VariantColorDialog.edit.select = color;
            this.VariantColorDialog.edit.variant = variant;

            this.VariantColorDialog.edit.type = true;
        },

        //Import WareHouse
        ShowVariantDialogImportWareHouse (variant) {
            this.VariantWareHouseDialog.setting.select = variant;
            this.VariantWareHouseDialog.setting.type = true;
        },

        //WareHouse Informartion
        ShowVariantDialogWareHouseInformarion (warehouse, variant) {
            this.VariantWareHouseDialog.info.variant = variant;
            this.VariantWareHouseDialog.info.select = warehouse;
            this.VariantWareHouseDialog.info.type = true;
        },

        //Edit Discount
        async EditVariantDiscount (variant) {
            this.Loading.editDiscount = true;
    
            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditVariantDiscount, {
                    _id: variant._id,
                    discount: variant.discount
                });

                this.Loading.editDiscount = false;

                this.ShowVariantDialogEditDiscount(variant);
            }
            catch(e){
                this.Loading.editDiscount = false;
            } 
        },

        //Edit Status
        async EditVariantStatus (status, variant) {
            this.Loading.editStatus = true;
    
            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditVariantStatus, {
                    _id: variant._id,
                    status: status
                });

                variant.status = status;

                this.Loading.editStatus = false;
            }
            catch(e){
                this.Loading.editStatus = false;
            } 
        }
    }
}
</script>