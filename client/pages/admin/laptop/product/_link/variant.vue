<template>
    <!--Laptop Product Link Variant-->

    <v-card flat tile class="BoxShadow">
        <!--Header-->
        <v-sheet class="d-flex justify-space-between align-center pr-4">
            <div>
                <v-card-title class="font-weight-bold text-h4 primary_admin--text">Variant</v-card-title>
                <v-card-subtitle>Các biến thể cấu hình của sản phẩm</v-card-subtitle>
            </div>

            <v-btn 
                color="primary_admin" 
                dark elevation="0" 
                tile large
                @click="VariantDialog.create = true"
            >
                <v-icon>add</v-icon>
                Thêm Mới
            </v-btn>
        </v-sheet>

        <!--If Variant List Empty-->
        <v-card-text v-if="Variants.length < 1">
            <v-alert 
                color="primary_admin" outlined
                type="info" tile border="right"
                class="ma-0"
            >
                Hiện tại chưa có biến thể nào của sản phẩm
            </v-alert>
        </v-card-text>

        <!--ELSE-->
        <v-row class="px-4" v-else>
            <v-col 
                :cols="(Variants.length > 1) ? 6 : 12" 
                v-for="(variant, indexVariant) in Variants" :key="indexVariant"
            >
                <v-card outlined>
                    <!--Header-->
                    <v-sheet class="d-flex justify-space-between align-center pr-4">
                        <div>
                            <v-card-title class="primary_admin--text font-weight-bold pb-2">{{variant.code}}</v-card-title>
                            <v-card-subtitle>Variant Code</v-card-subtitle>     
                        </div>

                        <v-chip color="primary_admin" dark class="font-weight-bold text-h6">
                            {{ variant.price.toLocaleString('vi-VN') }}
                        </v-chip>
                    </v-sheet>
                    
                    <!--Information-->
                    <v-sheet>
                        <div class="heading_admin d-flex justify-space-between align-center px-4 py-2">
                            <span class="grey--text text-subtitle font-weight-bold">Thông Tin</span>
                            <v-btn icon small color="grey" @click="ShowVariantDialogEdit(indexVariant, variant)"><v-icon>edit</v-icon></v-btn>
                        </div>

                        <v-card-text>
                            <v-sheet 
                                v-for="prop in ConfigurationShow" :key="prop" 
                                class="d-flex justify-space-between align-center my-1"
                            >
                                <span class="text-subtitle-2 font-weight-bold text-uppercase">{{prop}}</span>
                                <v-chip>{{ variant[prop] }}</v-chip>
                            </v-sheet>

                            <v-sheet 
                                class="d-flex justify-space-between align-center my-1"
                            >
                                <span class="text-subtitle-2 font-weight-bold text-uppercase">Trạng Thái</span>
                                <v-chip color="info">
                                    {{ variant.status }}
                                </v-chip>
                            </v-sheet>     
                        </v-card-text>
                    </v-sheet>

                    <!--Color-->
                    <v-sheet>
                        <div class="heading_admin d-flex justify-space-between align-center px-4 py-2">
                            <span class="grey--text text-subtitle font-weight-bold">Màu Sắc</span>
                            <v-btn icon small color="grey" @click="ShowVariantDialogCreateColor(variant)"><v-icon>add</v-icon></v-btn>
                        </div>

                        <v-card-text v-if="variant.colors.length > 0">
                            <v-btn 
                                v-for="(color, indexColor) in variant.colors" :key="indexColor" 
                                :color="color.code" fab elevation="0"
                                class="mr-1 mb-1"
                                @click="ShowVariantDialogEditColor(indexColor, color, variant)"
                            ></v-btn>
                        </v-card-text>
                    </v-sheet>

                    <!--Discount-->
                    <v-sheet>
                        <div class="heading_admin d-flex justify-space-between align-center px-4">
                            <span class="grey--text text-subtitle font-weight-bold">Giảm Giá</span>

                            <v-switch 
                                v-model="variant.discount.type" :disabled="Loading.edit"
                                @change="EditVariantDiscount(variant)"
                                color="primary_admin" class="SwitchDiscountVariant ma-0 pa-0"
                            ></v-switch>
                        </div>

                        <v-card-text v-if="variant.discount.type">
                            <v-form ref="form">
                                <v-text-field
                                    v-model="variant.discount.amount"
                                    hide-details
                                    label="Discount Amount"
                                    outlined type="number"
                                    placeholder="Số tiền giảm giá"
                                    append-icon="save"
                                    color="primary_admin"
                                    :disabled="Loading.edit"
                                    autocomplete="off"
                                    @click:append="EditVariantDiscount(variant)"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                    </v-sheet>
                </v-card>
            </v-col>
        </v-row>

        <!--Dialog Create Variant-->
        <v-dialog v-model="VariantDialog.create" persistent max-width="550">
            <ALaptopProductVariantCreate 
                @cancel="VariantDialog.create = false" 
                :product="product"
            ></ALaptopProductVariantCreate>
        </v-dialog>

        <!--Dialog Edit Variant-->
        <v-dialog v-model="VariantDialog.edit.type" persistent max-width="550">
            <ALaptopProductVariantEdit
                @delete="$delete(product.variants, VariantDialog.edit.index)"
                @cancel="VariantDialog.edit.type = false" 
                :variant="VariantDialog.edit.select"
            ></ALaptopProductVariantEdit>
        </v-dialog>

        <!--Dialog Create Color Variant-->
        <v-dialog v-model="VariantColorDialog.create.type" persistent max-width="550">
            <ALaptopProductVariantColorCreate
                @cancel="VariantColorDialog.create.type = false" 
                :variant="VariantColorDialog.create.select"
            ></ALaptopProductVariantColorCreate>
        </v-dialog>

        <!--Dialog Setting Color Variant-->
        <v-dialog v-model="VariantColorDialog.edit.type" persistent max-width="550">
            <ALaptopProductVariantColorEdit
                @delete="$delete(VariantColorDialog.edit.variant.colors, VariantColorDialog.edit.index)"
                @cancel="VariantColorDialog.edit.type = false" 
                :color="VariantColorDialog.edit.select"
            ></ALaptopProductVariantColorEdit>
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

                if(variant.discount.type === false){
                    variant.discount.amount = 0;
                }

                this.Loading.edit = false;
            }
            catch(e){
                this.Loading.edit = false;
            } 
        }
    }
}
</script>

<style lang="scss">
    .SwitchDiscountVariant {
        position: relative;
        top: 10px;
    }
</style>