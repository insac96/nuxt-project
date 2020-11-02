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
                            <th>Configuration</th>
                            <th class="text-center">Color</th>
                            <th class="text-center" width="120">Price</th>
                            <th class="text-center" width="120">Discount</th>
                            <th class="text-center" width="120">Status</th>
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

                            <!--3 - Price-->
                            <td class="text-center">
                                <v-chip class="font-weight-bold">{{  $String.toPrice(variant.price) }}đ</v-chip>
                            </td>

                            <!--4 - Discount-->
                            <td class="text-center">
                                <div v-if="!variant.discount.type" class="d-flex justify-center">
                                    <v-switch 
                                        hide-details
                                        v-model="variant.discount.type" :disabled="Loading.edit"
                                        @change="EditVariantDiscount(variant)"
                                        color="primary" class="ma-0 pa-0"
                                    ></v-switch>
                                </div>
                                
                                <v-chip v-else color="error" class="font-weight-bold" @click="ShowVariantDialogEditDiscount(variant)">
                                    {{ $String.toPrice(variant.discount.amount) }}đ
                                </v-chip>
                            </td>

                            <!--5 - Status-->
                            <td class="text-center">
                                <v-chip color="info" class="font-weight-bold">{{ variant.status }}</v-chip>
                            </td>

                            <!--6 - Edit-->
                            <td class="text-right">
                                <v-btn 
                                    color="grey" icon
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
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';
import * as VariantSetting from '@/setting/laptop/variant';

export default {
    props: ['product'],

    data () {
        return {
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
            Loading: {
                edit: false
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

        //Edit Discount
        async EditVariantDiscount (variant) {
            this.Loading.edit = true;
    
            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditVariantDiscount, {
                    _id: variant._id,
                    discount: variant.discount
                });

                this.Loading.edit = false;

                this.ShowVariantDialogEditDiscount(variant);
            }
            catch(e){
                this.Loading.edit = false;
            } 
        }
    }
}
</script>