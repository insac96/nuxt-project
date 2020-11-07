<template>
    <!--a_laptop_product_variant_discount_edit-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 edit--text">Edit Discount</v-card-title>
        <v-card-subtitle>Cài đặt giảm giá sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0">
            <v-form ref="form" v-model="Validate">
                <v-text-field
                    v-model="CloneVariant.discount.amount"
                    :rules="[ $Rules.specialCharacters, $Rules.price ]"
                    label="Discount Amount"                    
                    placeholder="Nhập số tiền giảm giá"
                    type="number"
                    color="edit"
                    autocomplete="off"
                    filled rounded
                    :disabled="Loading.edit"
                ></v-text-field>        
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-btn 
                color="delete" dark
                rounded elevation="0" large
                :loading="Loading.edit" 
                @click="EditVariantDiscount('OFF')"
            >
                Tắt
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn 
                rounded elevation="0" large
                :disabled="Loading.edit" 
                @click="Cancel"
            >
                Đóng
            </v-btn>
            
            <v-btn 
                color="edit" dark 
                rounded elevation="0" 
                large class="mx-0"
                :loading="Loading.edit" 
                @click="EditVariantDiscount()"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    props: ['variant'],

    data () {
        return {
            CloneVariant: JSON.parse(JSON.stringify(this.variant)),
            Loading: {
                edit: false
            },
            Validate: true,
        }
    },

    watch: {
        variant (newVal) {
            this.CloneVariant = JSON.parse(JSON.stringify(newVal))
        }
    },

    methods : {
        async EditVariantDiscount (type) {
            this.Loading.edit = true;

            if(type == "OFF" || this.CloneVariant.discount.amount == 0) {
                this.CloneVariant.discount.type = false;
                this.CloneVariant.discount.amount = 0;
            };
    
            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditVariantDiscount, {
                    _id: this.variant._id,
                    discount: this.CloneVariant.discount
                });

                Object.assign(this.variant.discount, this.CloneVariant.discount)
                this.Loading.edit = false;

                this.Cancel();
            }
            catch(e){
                this.Loading.edit = false;
            } 
        },

        Cancel () {
            this.$refs.form.resetValidation();

            this.$emit('cancel');
        },
    }
}
</script>