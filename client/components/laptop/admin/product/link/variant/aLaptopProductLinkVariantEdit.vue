<template>
    <!--a_laptop_product_variant_edit-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 edit--text">Edit Variant</v-card-title>
        <v-card-subtitle>Cài đặt biến thể sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-form class="px-6" ref="form" v-model="Validate">
            <v-row>
                <!--Left-->
                <v-col :cols="6">
                    <!-- Code -->
                    <v-text-field
                        v-model="CloneVariant.code"
                        :rules="[ $Rules.required ]"
                        label="Code"                    
                        placeholder="Mã cấu hình"
                        color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.edit"
                        :error-messages="ErrorHint.code"
                        @click="ErrorHint.code = null"
                    >
                        <template v-slot:message="{ message }">
                            {{ ErrorHint.code ? ErrorHint.code : message }}
                        </template>
                    </v-text-field>   

                    <!-- Screen -->
                    <v-combobox
                        v-model="CloneVariant.screen"
                        :rules="[ $Rules.required ]"
                        label="Screen"                    
                        placeholder="ex: 14 FHD"
                        :items="VariantSelectConfiguration.screen"
                        color="create"
                        item-color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.edit"
                    ></v-combobox>

                    <!-- CPU -->
                    <v-combobox
                        v-model="CloneVariant.cpu"
                        :rules="[ $Rules.required ]"
                        label="CPU"                    
                        placeholder="ex: i7 9900H"
                        :items="VariantSelectConfiguration.cpu"
                        color="create"
                        item-color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.edit"
                    ></v-combobox>
                </v-col>

                <!--Right-->
                <v-col :cols="6">
                    <!-- Ram -->
                    <v-combobox
                        v-model="CloneVariant.ram"
                        :rules="[ $Rules.required ]"
                        label="RAM"               
                        placeholder="ex: 8GB"
                        :items="VariantSelectConfiguration.ram"
                        color="create"
                        item-color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.edit"
                    ></v-combobox>

                    <!-- HardDrive -->
                    <v-combobox
                        v-model="CloneVariant.harddrive"
                        :rules="[ $Rules.required ]"
                        label="HardDrive"               
                        placeholder="ex: 512GB"
                        :items="VariantSelectConfiguration.harddrive"
                        color="create"
                        item-color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.edit"
                    ></v-combobox>

                    <!-- GPU -->
                    <v-combobox
                        v-model="CloneVariant.gpu"
                        :rules="[ $Rules.required ]"
                        :items="VariantSelectConfiguration.gpu"
                        label="GPU"               
                        placeholder="ex: RTX 2060"
                        color="create"
                        item-color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.edit"
                    ></v-combobox>
                </v-col>
            </v-row>
        </v-form>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-btn 
                color="delete" dark 
                rounded elevation="0" 
                large class="mx-0"
                :disabled="Loading.edit"
                :loading="Loading.delete" 
                @click="DeleteVariant"
            >
                Xóa
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn 
                rounded elevation="0" large 
                :disabled="Loading.delete || Loading.edit"  
                @click="Cancel"
            >
                Đóng
            </v-btn>
            
            <v-btn 
                color="edit" dark 
                rounded elevation="0" 
                large class="mx-0" 
                :disabled="Loading.delete"
                :loading="Loading.edit" 
                @click="EditVariant"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import * as VariantSelectSetting from '@/setting/laptop/variant';

export default {
    props: ['variant'],

    data () {
        return {
            VariantSelectConfiguration: VariantSelectSetting.configuration,
            CloneVariant: JSON.parse(JSON.stringify(this.variant)),
            ModelVariant: {},
            Loading: {
                edit: false,
                delete: false
            },
            Validate: true,
            ErrorHint: {
                code: null
            }
        }
    },

    watch: {
        variant (newVal) {
            this.CloneVariant = JSON.parse(JSON.stringify(newVal))
        }
    },

    methods : {
        async EditVariant () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.edit = true;
    
            try {
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditVariant, this.CloneVariant);

                if(Edit.error) throw Edit;

                this.UpdateEdit();

                this.Loading.edit = false;
            }
            catch(e){
                this.Loading.edit = false;

                if(e.error) return this.ErrorHint[e.status] = e.message;
            } 
        },

        UpdateEdit(){
            Object.assign(this.variant, this.CloneVariant);
            this.Cancel();
        },

        async DeleteVariant () {
            this.Loading.delete = true;
            
            try {
                let Delete = await this.$axios.$post(this.$api.laptop.admin.DeleteVariant, {
                    _id: this.CloneVariant._id
                });

                this.Loading.delete = false;
                this.$emit('delete');

                this.Cancel();
            }
            catch(e){
                this.Loading.delete = false;
            } 
        },

        Cancel () {
            this.ErrorHint = {};
            this.$refs.form.resetValidation();

            this.$emit('cancel');
        },
    }
}
</script>