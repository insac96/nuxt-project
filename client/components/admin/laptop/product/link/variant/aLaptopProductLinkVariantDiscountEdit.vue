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
                    v-model.number="CloneVariant.discount.amount"
                    :rules="[ $Rules.specialCharacters, $Rules.price ]"
                    label="Discount Amount"                    
                    placeholder="Nhập số tiền giảm giá"
                    type="number"
                    color="edit"
                    autocomplete="off"
                    filled rounded
                    :disabled="Loading.edit"
                >
                    <template v-slot:append v-if="CloneVariant.discount.amount">
                        <v-chip small class="font-weight-bold" color="edit" dark>{{ $String.toPrice(CloneVariant.discount.amount) }}</v-chip>
                    </template>
                </v-text-field>        
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-spacer></v-spacer>

            <v-btn 
                color="delete" dark
                rounded elevation="0" large
                :loading="Loading.edit" 
                @click="EditVariantDiscount('OFF')"
            >
                Tắt
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
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditVariantDiscount, {
                    _id: this.variant._id,
                    discount: this.CloneVariant.discount
                });

                this.Update();

                this.Loading.edit = false;
            }
            catch(e){
                this.Loading.edit = false;
            } 
        },

        Update () {
            Object.assign(this.variant.discount, this.CloneVariant.discount)

            this.Cancel();
        },

        Cancel () {
            this.$refs.form.resetValidation();

            this.$emit('cancel');
        },
    }
}
</script>