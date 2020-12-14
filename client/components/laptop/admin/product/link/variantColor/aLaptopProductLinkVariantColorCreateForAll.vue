<template>
    <!--a_laptop_product_variantColor_create-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 create--text">Create Color For All Variant</v-card-title>
        <v-card-subtitle>Thêm màu sắc cho tất cả biến thể</v-card-subtitle>

        <!--Body-->
        <v-form class="px-6 pb-0" ref="form" v-model="Validate">
            <v-alert type="info" color="create" text class="rounded-xl mb-6" prominent>
                Để màu sắc được hiển thị cho người mua, cần cài đặt trong phần <strong>Nhập Kho</strong> !!!
            </v-alert>

            <!--Color Name-->
            <v-text-field
                v-model="NewVariantColor.name"
                :rules="[ $Rules.required ]"
                label="Color Name"                    
                placeholder="Tên màu sắc"
                color="create"
                autocomplete="off"
                filled rounded
                :disabled="Loading.create"
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
                        v-model="NewVariantColor.code"
                        :rules="[ $Rules.required ]"
                        label="Color Code"           
                        placeholder="Mã màu sắc"
                        color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.create"
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
                v-model="NewVariantColor.image"
                label="Color Image"                    
                placeholder="Hình ảnh sản phẩm"
                color="create"
                append-icon="image"
                autocomplete="off"
                filled rounded
                :disabled="Loading.create"
            ></v-text-field>
        </v-form>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-spacer></v-spacer>

            <v-btn 
                rounded elevation="0" large 
                :disabled="Loading.create" 
                @click="Cancel"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="create" dark 
                rounded elevation="0" 
                large class="mx-0" 
                :loading="Loading.create" 
                @click="CreateVariantColor"
            >
                Thêm
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: ['variants'],

    data () {
        return {
            NewVariantColor: {
                name: null,
                code: null,
                image: null
            },
            Validate: true,
            Loading: {
                create: false
            }
        }
    },

    methods : {
        async CreateVariantColor () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.create = true;

            try {
                for (let i = 0; i < this.variants.length; i++) {
                    let variant = this.variants[i];

                    let New = {};
                    New.company = variant.company;
                    New.trademark = variant.trademark;
                    New.product = variant.product;
                    New.variant = variant._id;
                    New.name = this.NewVariantColor.name;
                    New.code = this.NewVariantColor.code;
                    New.image = this.NewVariantColor.image;

                    let NewVariantColor = await this.$axios.$post(this.$api.laptop.admin.CreateVariantColor, New);

                    variant.colors.push(NewVariantColor);
                };

                this.Loading.create = false;
                this.Cancel();
            }
            catch(e){
                this.Loading.create = false;
            }
        },

        Cancel () {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();

            this.$emit('cancel');
        },

        SelectColor (color) {
            this.NewVariantColor.code = color.hex;

            if(color.alpha == 0) return color.alpha = 1;
        },
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