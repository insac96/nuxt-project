<template>
    <!--a_laptop_product_variantColor_edit_information-->

    <v-form ref="form" v-model="Validate.form">
        <!--Color Name-->
        <v-text-field
            v-model="color.name"
            :rules="Validate.name"
            label="Color Name"                    
            placeholder="Tên màu sắc"
            color="primary_admin"
            autocomplete="off"
            outlined
            :disabled="Loading.edit"
        ></v-text-field>

        <!--Color Code-->
        <v-menu 
            offset-y
            :close-on-content-click="false" 
            :nudge-top="25"
            :nudge-right="200"
            max-width="300"
        >
            <!--Input-->
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="color.code"
                    :rules="Validate.code"
                    label="Color Code"           
                    placeholder="Mã màu sắc"
                    color="primary_admin"
                    autocomplete="off"
                    outlined
                    :disabled="Loading.edit"
                    v-on="on"
                ></v-text-field>
            </template>
            
            <!--Menu Show Select Color-->
            <v-card>
                <v-color-picker
                    class="ColorPicker_VariantColor"
                    hide-inputs
                    @update:color="SelectColor"
                ></v-color-picker>
            </v-card>
        </v-menu>

        <!--Color Image-->
        <v-text-field
            v-model="color.image"
            label="Color Image"                    
            placeholder="Hình ảnh sản phẩm"
            color="primary_admin"
            append-icon="image"
            autocomplete="off"
            outlined
            :disabled="Loading.edit"
        ></v-text-field>

        <!--Color Up Price-->
        <v-text-field
            v-model="color.upprice"
            :rules="Validate.upprice"
            label="Color Up Price"                    
            placeholder="Tăng giá so với giá gốc"
            color="primary_admin"
            autocomplete="off"
            outlined
            :disabled="Loading.edit"
        ></v-text-field>

        <!--Button Action-->
        <v-sheet class="d-flex">
            <v-btn 
                tile elevation="0" 
                large class="mx-0" 
                :disabled="Loading.edit"
                @click="$emit('cancel')"
            >
                Đóng
            </v-btn>

            <v-spacer></v-spacer>
            
            <v-btn 
                color="info" 
                tile elevation="0" 
                large class="mx-0" 
                :loading="Loading.edit"
                @click="EditVariantColor"
            >
                Lưu
            </v-btn>
        </v-sheet>
    </v-form>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';

export default {
    props: ['color'],
    
    data () {
        return {
            Validate: {
                form: true,
                name: [
                    v => !!v || 'Tên màu sắc không để trống',
                ],
                code: [
                    v => !!v || 'Mã code màu sắc không để trống',
                ],
                upprice: [
                    v => !!(v >= 0) || 'Số tiền không thể nhỏ hơn 0',
                ]
            },
            Loading: {
                edit: false
            }
        }
    },

    methods : {
        async EditVariantColor () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.edit = true;

            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditVariantColor, this.color);

                this.$emit('done', this.color);

                this.Loading.edit = false;
            }
            catch(e){
                return false;
            }
        },

        SelectColor (color) {
            this.color.code = color.hex;

            if(color.alpha == 0) return color.alpha = 1;
        }
    }
}
</script>

<style lang="scss">
    .ColorPicker_VariantColor {
        .v-color-picker__hue {
            margin-bottom: 0 !important;
        }
        .v-color-picker__alpha {
            display: none;
        }
    }
</style>