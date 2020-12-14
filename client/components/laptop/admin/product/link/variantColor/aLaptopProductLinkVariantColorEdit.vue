<template>
    <!--a_laptop_product_variantColor_edit-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 edit--text">Setting Color</v-card-title>
        <v-card-subtitle>Cài đặt màu sắc cho biến thể</v-card-subtitle>

        <!--Body-->
        <v-form class="px-6 pb-0" ref="form" v-model="Validate">
            <!--Color Name-->
            <v-text-field
                v-model="CloneColor.name"
                :rules="[ $Rules.required ]"
                label="Color Name"                    
                placeholder="Tên màu sắc"
                color="edit"
                autocomplete="off"
                filled rounded
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
                        v-model="CloneColor.code"
                        :rules="[ $Rules.required ]"
                        label="Color Code"           
                        placeholder="Mã màu sắc"
                        color="edit"
                        autocomplete="off"
                        filled rounded
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
                v-model="CloneColor.image"
                label="Color Image"                    
                placeholder="Hình ảnh sản phẩm"
                color="edit"
                append-icon="image"
                autocomplete="off"
                filled rounded
                :disabled="Loading.edit"
            ></v-text-field>
        </v-form>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-btn 
                color="delete" dark
                rounded elevation="0" 
                large class="mx-0" 
                :disabled="Loading.edit"
                :loading="Loading.delete"
                @click="DeleteVariantColor"
            >
                Xoá
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn 
                rounded elevation="0" 
                large class="mx-0" 
                :disabled="Loading.edit || Loading.delete"
                @click="$emit('cancel')"
            >
                Đóng
            </v-btn>

            <v-btn 
                color="edit" dark
                rounded elevation="0" 
                large class="mx-0"
                :disabled="Loading.delete"
                :loading="Loading.edit"
                @click="EditVariantColor"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: ['color'],

    data () {
        return {
            CloneColor : JSON.parse(JSON.stringify(this.color)),
            Validate: true,
            Loading: {
                edit: false,
                delete: false
            }
        }
    },

    watch: {
        color (newVal) {
            this.CloneColor = JSON.parse(JSON.stringify(newVal))
        }
    },

    methods: {
        SelectColor (color) {
            this.CloneColor.code = color.hex;

            if(color.alpha == 0) return color.alpha = 1;
        },

        async EditVariantColor () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.edit = true;

            try {
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditVariantColor, this.CloneColor);

                Object.assign(this.color, this.CloneColor);
                this.Loading.edit = false;
            }
            catch(e){
                this.Loading.edit = false;
            }
        },

        async DeleteVariantColor () {
            this.Loading.delete = true;

            try {
                let Delete = await this.$axios.$post(this.$api.laptop.admin.DeleteVariantColor, {
                    _id: this.color._id
                });

                this.$emit('delete');
                
                this.Cancel();
                this.Loading.delete = false;
            }
            catch(e){
                this.Loading.delete = false;
            }
        },

        Cancel () {
            this.$emit('cancel');
        }
    }
}
</script>